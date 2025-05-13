const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('151040209139-vfpad4pm3ktv6pmrub9sjoj4ri4qr8dn.apps.googleusercontent.com');

// Register new user
// router.post('/register', async (req, res) => {
//     try {
//         const { firstname, lastname, email, password, phone, role } = req.body;

//         // Check if email already exists
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = new UserModel({
//             firstname,
//             lastname,
//             email,
//             password: hashedPassword,
//             phone,
//             role
//         });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).json({ message: 'Error registering user' });
//     }
// });

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

// Register new user
router.post('/register', async (req, res) => {
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

// user login
router.post('/login', (req, res) => {
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
router.post('/google-login', async (req, res) => {
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
});

// user information
router.get('/user-info', (req, res) => {
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

// Get user data by email
router.get('/:email', verifyRole(['Patient', 'Doctor', 'Admin']), async (req, res) => {
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
});

router.put('/:email', async (req, res) => {
    const { email } = req.params;
    const { firstname, lastname, phone } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstname = firstname ?? user.firstname;
        user.lastname = lastname ?? user.lastname;
        user.phone = phone ?? user.phone;

        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating profile' });
    }
});

// Update user password (PUT /api/users/:email/password)
router.put('/:email/password', async (req, res) => {
    const { email } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.password) {
            return res.status(400).json({ message: 'Password update not supported for Google users' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating password' });
    }
});

module.exports = router; 