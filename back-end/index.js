const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PatientModel = require('./models/patient')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())

mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/patient");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token was not available")
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json("Token is wrong")
                next();
            }
        })
    }
}

app.get('/home', verifyUser, (req, res) => {
    return res.json("Success")
})


app.post('/login', (req, res) => {
    const {email, password} = req.body;
    PatientModel.findOne({email: email})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, (err, response) => {   
                if(response) {
                    const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn:"1d"})
                    res.cookie("token", token);
                    res.json("Success")
                }
                else {
                    res.json("Password is incorrect")
                }
            })
        }
        else {
            res.json("No patient found")
        }
    })
})

app.post('/register', (req, res) => {
    const {firstname, lastname, email, phone, password} = req.body;
    // password confirmation
    if (req.body.password !== req.body.confirmpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    bcrypt.hash(password, 10)
    .then(async hash => {
        // create new patient account
        try {
            const newPatient = await PatientModel.create({firstname, lastname, email, phone, password: hash});
            res.json(newPatient);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to register patient" });
        }
    })
    .catch(err => console.log(err.message))

    
})

app.listen(3001, () => {
    console.log("Server is running")
})