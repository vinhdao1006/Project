const express = require('express');
const router = express.Router();
const PatientRecordModel = require('../models/patientRecords');

// create a new patient record
router.post('/', async (req, res) => {
    const { patientId, appointments } = req.body;

    try {
        const existingRecord = await PatientRecordModel.find({ patientId });
        if (existingRecord.length > 0) {
            return res.status(400).json({ message: 'Patient record already exists' });
        }
        else
        {
            const newRecord = new PatientRecordModel({
                patientId,
                appointmentsHistory: appointments.map(appointment => ({
                    appointmentId: appointment._id,
                    date: appointment.appointmentDate,
                    time: appointment.appointmentTime,
                    doctorId: appointment.doctorId
                }))
            });
            await newRecord.save();
            res.status(201).json(newRecord);}
        }
    catch (error) {
        console.error('Error creating patient record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

module.exports = router;
