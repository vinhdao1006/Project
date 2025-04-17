const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    password: String,
    confirmpassword: String,
    role: {
        type: String,
        enum: ["Patient", "Doctor", "Admin"],
        default: "Patient"
    }
})

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel