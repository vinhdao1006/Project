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
    },
    userId: {
        type: String,
        unique: true,
        ref: "Users"
    }
})

// Pre-save hook to generate userId based on role
UserSchema.pre("save", function(next) {
    if (!this.userId) {
        let prefix = "P";
        if (this.role === "Doctor") prefix = "D";
        if (this.role === "Admin") prefix = "A";
        const randomNum = Math.floor(Math.random() * 10000) + 1;
        this.userId = `${prefix}${randomNum}`;
    }
    next();
});

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel