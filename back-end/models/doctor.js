const mongoose = require("mongoose")

const DoctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    specialty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialties',
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
    occupation: [String],
    languages: [String],
    title: String,
    degree: String,
})

const DoctorModel = mongoose.model("Doctors", DoctorSchema)
module.exports = DoctorModel 