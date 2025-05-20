const express = require('express');
const router = express.Router();
const PatientRecordModel = require('../models/patientRecords');

// create a new patient record
router.post('/', async (req, res) => {
    const { patientId, appointments } = req.body;
    try {
        // Extract gender and dayOfBirth from the first appointment
        const gender = appointments[0]?.gender;
        const dayOfBirth = appointments[0]?.dayOfBirth;

        const update = {
            gender,
            dayOfBirth,
            appointmentsHistory: appointments.map(appointment => ({
                appointmentId: appointment._id,
                date: appointment.appointmentDate,
                time: appointment.appointmentTime,
                doctorId: appointment.doctorId,
                reason: appointment.reason,
            }))
        };

        // Upsert: update if exists, otherwise create new
        const updatedRecord = await PatientRecordModel.findOneAndUpdate(
            { patientId },
            { $set: update },
            { new: true, upsert: true }
        );

        res.status(200).json(updatedRecord);
    } catch (error) {
        console.error('Error creating/updating patient record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all appointments history for a patient
router.get('/:patientId/appointments-history', async (req, res) => {
    const { patientId } = req.params;
    try {
        const patientRecord = await PatientRecordModel.findOne({ patientId });
        if (!patientRecord) {
            return res.status(404).json({ message: 'Patient record not found' });
        }

        // Get all unique doctorIds from appointmentsHistory
        const doctorIds = [
            ...new Set(patientRecord.appointmentsHistory.map(a => a.doctorId))
        ];

        // Fetch all doctors in one query
        const DoctorModel = require('../models/doctor');
        const doctors = await DoctorModel.find({ doctorId: { $in: doctorIds } });
        
        // Map doctorId to doctor name
        const doctorMap = {};
        doctors.forEach(doc => {
            doctorMap[doc.doctorId] = `Dr. ${doc.firstname} ${doc.lastname}`;
        });

        // Map appointmentsHistory to include doctor name
        const appointmentsHistory = patientRecord.appointmentsHistory.map(appointment => ({
            appointmentId: appointment.appointmentId,
            date: appointment.date,
            time: appointment.time,
            doctorId: appointment.doctorId,
            doctorName: doctorMap[appointment.doctorId] || appointment.doctorId, // fallback to id if not found
            reason: appointment.reason,
        }));
        res.status(200).json(appointmentsHistory);
    } catch (error) {
        console.error('Error fetching appointments history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
