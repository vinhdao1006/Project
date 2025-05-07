const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('../models/user')
const SpecialtyModel = require('../models/specialty')
const DoctorModel = require('../models/doctor')
const AppointmentModel = require('../models/appointment')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('151040209139-vfpad4pm3ktv6pmrub9sjoj4ri4qr8dn.apps.googleusercontent.com');

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/user");

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
            const jwtToken = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" });
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

app.post('/register', async (req, res) => {
    try {
      const { firstname, lastname, email, phone, password, role } = req.body;
  
      // Check for required fields
      if (!firstname || !lastname || !email || !phone || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        console.log("existing Email")
        return res.status(409).json({ message: 'Email already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        phone,
        password: hashedPassword,
        role,
      });
  
      await newUser.save();
      res.status(200).json({ message: 'User registered successfully' });
  
    } catch (error) {
      if (error.code === 11000) {
        console.log("debug1")
        return res.status(409).json({ message: 'Email already exists' });
      }
      console.error('Register Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
// Get all specialties
app.get('/api/specialties', async (req, res) => {
    try {
        const specialties = await SpecialtyModel.find();
        res.json(specialties);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

// Get user data by email
app.get('/api/users/:email', verifyRole(['Patient', 'Doctor', 'Admin']), async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
}
);

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


app.listen(3001, () => {
    console.log("Server is running")
})