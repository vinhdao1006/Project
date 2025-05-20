const moongoose = require('mongoose');

const PatientRecordSchema = new moongoose.Schema({
    patientId: {
        type: String,
        ref: 'Users',
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    dayOfBirth: {
        type: Date,
        required: true,
    },
    appointmentsHistory: [{
        appointmentId: {
            type: String,
            ref: 'Appointments',
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }, 
        time: {
            type: String,
            required: true
        },
        doctorId: {
            type: String,
            ref: 'Doctors',
            required: true
        },
        reason: {
            type: String,
            required: true
        }
    }],
    testReports: [{
        testName: String,
        testDate: Date,
        results: String
    }],
    prescriptions: [{
        medication: String,
        dosage: String,
        frequency: String
    }],
    overview: [{
        bloodGlucose: Number,
        bloodPressure: String,
        heartRate: String,
        weight: String,
        height: String,
        temperature: String,
    }]
});

const PatientRecordModel = moongoose.model("PatientRecords", PatientRecordSchema);
module.exports = PatientRecordModel;