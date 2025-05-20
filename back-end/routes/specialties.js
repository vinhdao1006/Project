const SpecialtyModel = require('../models/specialty');
const express = require('express');
const router = express.Router();

// Get all specialties
router.get('/', async (req, res) => {
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

module.exports = router;