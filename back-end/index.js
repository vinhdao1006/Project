require('dotenv').config();
const connection = require("./db");
const express = require("express");
const app = express();
const path = require("path");

connection(); // Connect to MongoDB

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

// Get doctors by specialty
app.get('/api/doctors/:specialtyId', async (req, res) => {
    try {
        const doctors = await DoctorModel.find({ specialty: req.params.specialtyId })
            .populate('userId', 'firstname lastname')
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
