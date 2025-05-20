const mongoose = require("mongoose")

const DoctorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    doctorId: {
        type: String,
        ref: 'Users',
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    availability: [{
        day: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        }
    }],
    consultationFee: {
        type: Number,
        required: true
    },
    experience: String,
    languages: [String],
    title: String,
    degree: String,
})

const DoctorModel = mongoose.model("Doctors", DoctorSchema)
module.exports = DoctorModel 