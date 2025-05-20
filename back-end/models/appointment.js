const mongoose = require("mongoose")

const AppointmentSchema = new mongoose.Schema({
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
    specialtyId: {
        type: String,
        ref: 'Specialties',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    reason: {
        type: String,
        required: true
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const AppointmentModel = mongoose.model("Appointments", AppointmentSchema)
module.exports = AppointmentModel 