const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user')
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

app.post('/register', (req, res) => {
    const { firstname, lastname, email, phone, password, role } = req.body;

    // password confirmation
    if (req.body.password !== req.body.confirmpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    bcrypt.hash(password, 10)
        .then(async hash => {
            // create new account
            try {
                const newUser = await UserModel.create({ 
                    firstname, 
                    lastname, 
                    email, 
                    phone, 
                    password: hash,
                    role 
                })
                res.json(newUser);
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