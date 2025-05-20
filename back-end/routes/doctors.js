const DoctorModel = require('../models/doctor');
const SpecialtyModel = require('../models/specialty');
const AppointmentModel = require('../models/appointment');
const express = require('express');
const router = express.Router();

// get doctors
router.get('/', async (req, res) => {
    try 
    {
        const doctors = await DoctorModel.find()
        res.json(doctors)
    } catch (error)
    {
        res.status(500).json({ error: error.message})
    }
});

// Search doctors with multiple filters
router.get('/search', async (req, res) => {
    try {
        // console.log("api search doctors")
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
        
        // console.log('Search query:', query); // For debugging
        
        const doctors = await DoctorModel.find(query)
            .populate('firstname lastname')
            .populate('specialty', 'name');
            
        // console.log('Found doctors:', doctors.length); // For debugging
        res.json(doctors);
    } catch (error) {
        console.error('Search error:', error); // For debugging
        res.status(500).json({ error: error.message });
    }
});

// Get doctors by specialty
router.get('/:specialty', async (req, res) => {
    try {
        const a = await SpecialtyModel.find()

        const doctors = await DoctorModel.find({ specialty: req.params.specialty })
            .populate('firstname lastname')
            .populate('specialty', 'name');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get doctor's availability
router.get('/availability/:doctorId', async (req, res) => {
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

// get patients by doctor
router.get('/get-patients/:doctorId', async (req, res) => {
    try {
        const doctor = await DoctorModel.findOne({ doctorId: req.params.doctorId });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        const patients = await AppointmentModel.find({ doctorId: req.params.doctorId })
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
