const mongoose = require("mongoose")

const SpecialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: String,
    code: {
        type: String,
        unique: true
    }
})

const SpecialtyModel = mongoose.model("Specialties", SpecialtySchema)
module.exports = SpecialtyModel 