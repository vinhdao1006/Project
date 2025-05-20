const moongoose = require('mongoose');

const PatientRecordSchema = new moongoose.Schema({
    patientId: {
        type: String,
        ref: 'Users',
        required: true
    },
    doctorId: {
        type: String,
        ref: 'Doctors',
        required: true
    },
    appointmentId: {
        type: String,
        ref: 'Appointments',
        required: true
    },
    recordDate: {
        type: Date,
        default: Date.now
    },
    symptoms: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    notes: String,
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