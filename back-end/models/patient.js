const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    password: String,
    confirmpassword: String
})

const PatientModel = mongoose.model("patients", PatientSchema)
module.exports = PatientModel