require('dotenv').config();
const connection = require("./db");
const express = require("express");
const app = express();

connection(); // Connect to MongoDB

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Server is running on port ${port}...`));

// const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user')
const SpecialtyModel = require('./models/specialty')
const DoctorModel = require('./models/doctor')
const AppointmentModel = require('./models/appointment')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('151040209139-vfpad4pm3ktv6pmrub9sjoj4ri4qr8dn.apps.googleusercontent.com');

const googleCalendar = require("./routes/google_services")
app.use("/api/calendar", googleCalendar);

const path = require("path");

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))

// Serve images from /public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser())

// mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/user");

const verifyRole = (roles) => (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json("Unauthorized");
    }

    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
            return res.status(403).json("Forbidden");
        }

        if (!roles.includes(decoded.role)) {
            return res.status(403).json("Access Denied");
        }

        req.user = decoded; 
        next();
    });
};

// Admin route
app.get('/admin', verifyRole(['admin']), (req, res) => {
    res.json("Welcome, Admin! You have access to this route.");
});

// Doctor route
app.get('/doctor', verifyRole(['doctor']), (req, res) => {
    res.json("Welcome, Doctor! You have access to this route.");
});

// Patient route
app.get('/patient', verifyRole(['patient']), (req, res) => {
    res.json("Welcome, Patient! You have access to this route.");
});

// user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign(
                            { email: user.email, role: user.role }, 
                            "jwt-secret-key", { expiresIn: "1d" }
                        );
                        res.cookie("token", token);
                        res.json({token, message: "Success"});
                    }
                    else {
                        res.json("Password is incorrect")
                    }
                })
            }
            else {
                res.json("No user found")
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
})

// google login 
app.post('/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '151040209139-vfpad4pm3ktv6pmrub9sjoj4ri4qr8dn.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        // console.log('Google User Info:', payload);

        const user = await UserModel.findOne({ email: payload.email });
        // console.log('user:', user)

        if(user)
        {
            const jwtToken = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" });
            res.cookie("token", jwtToken);
            res.json({jwtToken, message: "Success"});
        }
        else {
            const newUser = await UserModel.create({ email: payload.email, firstname: "", lastname: "", password: "" });
            res.json({newUser, message: "Success"})
        }
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(500).json({ error: 'Unauthorized' });
    }
})

// Register new user
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, phone, password, confirmpassword, role, specialty } = req.body;

    // Password confirmation
    if (password !== confirmpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
            role,
            specialty: role === "Doctor" ? specialty : null // Set specialty only for doctors
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
    }
});

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

// user information
app.get('/user-info', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, "jwt-secret-key", async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden" });
        }

        try {
            const user = await UserModel.findOne({ email: decoded.email }).select('-password'); // Exclude password
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
});

// Add doctor endpoint


// app.listen(3001, () => {
//     console.log("Server is running")
// })
