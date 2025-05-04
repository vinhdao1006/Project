const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, role } = req.body;

        // Check if email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phone,
            role
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

module.exports = router; 