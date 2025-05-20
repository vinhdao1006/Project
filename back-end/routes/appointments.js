const AppointmentModel = require('../models/appointment');
const DoctorModel = require('../models/doctor');
const UserModel = require('../models/user');
const express = require('express');
const router = express.Router();

// Create new appointment
router.post('/', async (req, res) => {
    try {
        const { patientId, fullname, gender, dayOfBirth, doctorId, specialtyId, appointmentDate, appointmentTime, reason } = req.body;
        
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
            fullname,
            gender,
            dayOfBirth,
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
router.get('/:patientId', async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({ patientId: req.params.patientId })
            .sort({ appointmentDate: 1 });

        // Fetch doctor info for each appointment
        const doctorIds = appointments.map(appt => appt.doctorId);
        const doctors = await DoctorModel.find({ doctorId: { $in: doctorIds } });

        // Map doctorId to doctor info
        const doctorMap = {};
        doctors.forEach(doc => {
            doctorMap[doc.doctorId] = {
                firstname: doc.firstname,
                lastname: doc.lastname,
                // add more fields if needed
            };
        });

        // Attach doctor info to each appointment
        const appointmentsWithDoctor = appointments.map(appt => ({
            ...appt.toObject(),
            doctorInfo: doctorMap[appt.doctorId] || null
        }));

        res.json(appointmentsWithDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all appointments 
router.get('/', async (req, res) => {
    try {
        const appointments = await AppointmentModel.find().sort({ appointmentDate: 1 });

        // Collect unique patientIds and doctorIds
        const patientIds = [...new Set(appointments.map(a => a.patientId))];
        const doctorIds = [...new Set(appointments.map(a => a.doctorId))];

        // Fetch user and doctor info
        const users = await UserModel.find({ userId: { $in: patientIds } });
        const doctors = await DoctorModel.find({ doctorId: { $in: doctorIds } });

        // Map for quick lookup
        const userMap = {};
        users.forEach(u => {
            userMap[u.userId] = { firstname: u.firstname, lastname: u.lastname };
        });
        const doctorMap = {};
        doctors.forEach(d => {
            doctorMap[d.doctorId] = { firstname: d.firstname, lastname: d.lastname };
        });

        // Attach info to each appointment
        const appointmentsWithInfo = appointments.map(a => ({
            ...a.toObject(),
            patientInfo: userMap[a.patientId] || null,
            doctorInfo: doctorMap[a.doctorId] || null,
        }));

        res.json(appointmentsWithInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;