const mongoose = require("mongoose")

const SpecialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: String
})

const SpecialtyModel = mongoose.model("Specialties", SpecialtySchema)
module.exports = SpecialtyModel 