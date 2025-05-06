const mongoose = require("mongoose")

const SpecialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: 
    {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const SpecialtyModel = mongoose.model("Specialties", SpecialtySchema)
module.exports = SpecialtyModel 