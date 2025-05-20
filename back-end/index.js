require('dotenv').config();
const connection = require("./db");
const express = require("express");
const app = express();
const path = require("path");
const initDoctors = require("./initDoctors")
const initSpecialties = require("./initSpecialties")
const OpenAI = require('openai');

// Initialize database and data
async function initializeApp() {
    try {
        await connection(); // Connect to MongoDB
        await initSpecialties.initializeSpecialties();
        await initDoctors.initializeDoctors();
        console.log('Database initialization completed');
    } catch (error) {
        console.error('Error during initialization:', error);
        process.exit(1);
    }
}

initializeApp();

const port = process.env.PORT || 3001;
app.listen(port, console.log(`Server is running on port ${port}...`));

const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://doantotnghiep-46d1uh2dh-khiem-truongs-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// google calendar
const googleCalendar = require("./routes/google_services")
app.use("/api/calendar", googleCalendar);

// user routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// notification routes
const notificationRoutes = require("./routes/notifications");
app.use("/api/notifications", notificationRoutes);

// doctor routes
const doctorRoutes = require("./routes/doctors");
app.use("/api/doctors", doctorRoutes);

// appointment routes
const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);

// specialty routes
const specialtyRoutes = require("./routes/specialties");
app.use("/api/specialties", specialtyRoutes);

// Serve images from /public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

// AI Assistant chat endpoint
app.post('/api/ai-assistant/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // System message to set context
        const systemMessage = {
            role: "system",
            content: `You are a helpful medical assistant for Bimec Hospital. 
            You can help with:
            - General hospital information
            - Appointment scheduling
            - Department locations
            - Insurance and billing questions
            - Basic medical advice
            - Doctor availability
            Please be professional, empathetic, and concise in your responses.
            If a question is beyond your scope, suggest contacting the hospital directly.`
        };

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage,
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        const response = completion.choices[0].message.content;
        res.json({ response });
    } catch (error) {
        console.error('AI Assistant error:', error);
        res.status(500).json({ error: 'Failed to process your request. Please try again.' });
    }
});

