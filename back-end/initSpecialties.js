const mongoose = require('mongoose');
const SpecialtyModel = require('./models/specialty');

// Connect to MongoDB
mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/user")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const defaultSpecialties = [
    { name: "Neurology", description: "Specializes in the treatment of disorders of the nervous system", code: "NEURO" },
    { name: "Oncology", description: "Focused on the diagnosis and treatment of cancer", code: "ONCO" },
    { name: "Otorhinolaryngology", description: "Deals with conditions of the ear, nose, and throat (ENT)", code: "ENT" },
    { name: "Ophthalmology", description: "Concerned with the diagnosis and treatment of eye disorders", code: "OPHTH" },
    { name: "Cardiovascular", description: "Focuses on diseases and disorders of the heart and blood vessels", code: "CARDIO" },
    { name: "Pulmonology", description: "Specializes in diseases involving the respiratory tract and lungs", code: "PULMO" },
    { name: "Renal Medicine", description: "Deals with the diagnosis and treatment of kidney-related conditions", code: "RENAL" },
    { name: "Gastroenterology", description: "Specializes in the digestive system and its disorders", code: "GASTRO" },
    { name: "Urology", description: "Focuses on the urinary tract system and male reproductive organs", code: "URO" },
    { name: "Dermatology", description: "Concerns the skin, hair, nails, and related disorders", code: "DERMA" },
    { name: "Gynaecology", description: "Specializes in the health of the female reproductive systems", code: "GYN" }
];

async function initializeSpecialties() {
    try {
        // First, clear existing specialties
        await SpecialtyModel.deleteMany({});
        console.log('Cleared existing specialties');

        // Insert new specialties
        const result = await SpecialtyModel.insertMany(defaultSpecialties);
        console.log(`Successfully inserted ${result.length} specialties`);

        // Verify the insertion
        const count = await SpecialtyModel.countDocuments();
        console.log(`Total specialties in database: ${count}`);

        // List all specialties
        const specialties = await SpecialtyModel.find();
        console.log('Current specialties in database:', specialties);

    } catch (error) {
        console.error('Error initializing specialties:', error);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

initializeSpecialties(); 