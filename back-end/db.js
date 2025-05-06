const mongoose = require("mongoose");

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
        }
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        console.log("MongoDB connection error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};