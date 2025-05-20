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
UserSchema.pre("save", async function(next) {
    if (!this.userId) {
        let prefix = "P";
        if (this.role === "Doctor") prefix = "D";
        if (this.role === "Admin") prefix = "A";

        try {
            const count = await mongoose.model("Users").countDocuments({ role: this.role });
            this.userId = `${prefix}${count + 1}`;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});


const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel