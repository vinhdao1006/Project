require('dotenv').config();
const connection = require("./db");
const express = require("express");
const app = express();
const path = require("path");
const initDoctors = require("./initDoctors")
const initSpecialties = require("./initSpecialties")
const OpenAI = require('openai');

// Initialize database and data
async function initializeApp() {
    try {
        await connection(); // Connect to MongoDB
        await initSpecialties.initializeSpecialties();
        await initDoctors.initializeDoctors();
        console.log('Database initialization completed');
    } catch (error) {
        console.error('Error during initialization:', error);
        process.exit(1);
    }
}

initializeApp();

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Server is running on port ${port}...`));

const cors = require("cors")
const SpecialtyModel = require('./models/specialty')
const DoctorModel = require('./models/doctor')
const AppointmentModel = require('./models/appointment')

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}))

// google calendar
const googleCalendar = require("./routes/google_services")
app.use("/api/calendar", googleCalendar);

// user routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Serve images from /public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  
// Get all specialties
app.get('/api/specialties', async (req, res) => {
    try {
        const specialties = await SpecialtyModel.find();
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const result = specialties.map(s => ({
            ...s._doc,
            image: baseUrl + s.image, // prepend full URL
        }));
        res.json(result); 
    } catch (error) {
        console.error('Error fetching specialties:', error);
        res.status(500).json({ error: 'Failed to fetch specialties' });
    }
});

// get doctors
app.get('/api/doctors', async (req, res) => {
    try 
    {
        const doctors = await DoctorModel.find()
        res.json(doctors)
    } catch (error)
    {
        res.status(500).json({ error: error.message})
    }
})

// Search doctors with multiple filters
app.get('/api/doctors/search', async (req, res) => {
    try {
        console.log("api search doctors")
        const { specialty, occupation, title, language, degree } = req.query;
        
        // Build the query object based on provided filters
        const query = {};
        
        if (specialty) {
            query.specialty = specialty;
        }
        if (occupation) {
            query.role = occupation;
        }
        
        if (title) {
            query.title = title;
        }
        
        if (language) {
            query.languages = { $in: [language] };
        }
        
        if (degree) {
            query.degree = degree;
        }
        
        console.log('Search query:', query); // For debugging
        
        const doctors = await DoctorModel.find(query)
            .populate('firstname lastname')
            .populate('specialty', 'name');
            
        console.log('Found doctors:', doctors.length); // For debugging
        res.json(doctors);
    } catch (error) {
        console.error('Search error:', error); // For debugging
        res.status(500).json({ error: error.message });
    }
});

// Get doctors by specialty
app.get('/api/doctors/:specialty', async (req, res) => {
    try {
        //use this code to print list of specialties when trying to debug  
        const a = await SpecialtyModel.find()
        console.log("api doctors specialy: ")
        for (var i = 0; i < a.length; ++i)
            console.log(a[i])

        const doctors = await DoctorModel.find({ specialty: req.params.specialty })
            .populate('firstname lastname')
            .populate('specialty', 'name');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get doctor's availability
app.get('/api/doctor-availability/:doctorId', async (req, res) => {
    try {
        const doctor = await DoctorModel.findById(req.params.doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor.availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new appointment
app.post('/api/appointments', async (req, res) => {
    try {
        const { patientId, doctorId, specialtyId, appointmentDate, appointmentTime, reason } = req.body;
        
        // Check if the time slot is available
        const existingAppointment = await AppointmentModel.findOne({
            doctorId,
            appointmentDate,
            appointmentTime,
            status: { $in: ['Pending', 'Confirmed'] }
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'This time slot is already booked' });
        }

        const appointment = new AppointmentModel({
            patientId,
            doctorId,
            specialtyId,
            appointmentDate,
            appointmentTime,
            reason
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get patient's appointments
app.get('/api/patient-appointments/:patientId', async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({ patientId: req.params.patientId })
            .populate('doctorId')
            .populate('specialtyId', 'name')
            .sort({ appointmentDate: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

// AI Assistant chat endpoint
app.post('/api/ai-assistant/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // System message to set context
        const systemMessage = {
            role: "system",
            content: `You are a helpful medical assistant for Bimec Hospital. 
            You can help with:
            - General hospital information
            - Appointment scheduling
            - Department locations
            - Insurance and billing questions
            - Basic medical advice
            - Doctor availability
            Please be professional, empathetic, and concise in your responses.
            If a question is beyond your scope, suggest contacting the hospital directly.`
        };

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage,
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        const response = completion.choices[0].message.content;
        res.json({ response });
    } catch (error) {
        console.error('AI Assistant error:', error);
        res.status(500).json({ error: 'Failed to process your request. Please try again.' });
    }
});

