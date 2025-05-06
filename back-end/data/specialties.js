const mongoose = require('mongoose');
const SpecialtyModel  = require('../models/specialty.js');

const specialties = [
    {
        "name": "Emergency Department",
        "code": "ED",
        "description": "Provides immediate care for acute illnesses and injuries",
        "image": "/uploads/specialties/emergency.jpg"
    },
    {
        "name": "Cardiology",
        "code": "CD",
        "description": "Specializes in the diagnosis and treatment of heart-related conditions",
        "image": "/uploads/specialties/cardiology.jpg"
    },
    {
        "name": "Neurology",
        "code": "NG",
        "description": "Specializes in the treatment of disorders of the nervous system",
        "image": "/uploads/specialties/neurology.jpg"
    },
    {
        "name": "Pediatrics",
        "code": "PD",
        "description": "Focuses on the health and medical care of infants, children, and adolescents",
        "image": "/uploads/specialties/pediatrics.jpg"
    },
    {
        "name": "Obstetrics and Gynaecology",
        "code": "OG",
        "description": "Provides care for Women’s reproductive health and childbirth",
        "image": "/uploads/specialties/gynecology.jpg"
    },
    {
        "name": "Oncology",
        "code": "ON",
        "description": "Focused on the diagnosis and treatment of cancer",
        "image": "/uploads/specialties/oncology.jpg"
    },
    {
        "name": "Orthopaedics",
        "code": "OP",
        "description": "Specializes in the musculoskeletal system, including bones, joints, and ligaments",
        "image": "/uploads/specialties/orthopaedics.jpg"
    },
    {
        "name": "Radiology",
        "code": "RD",
        "description": "Uses imaging techniques to diagnose and treat diseases",
        "image": "/uploads/specialties/radiology.jpg"
    },
    {
        "name": "Pathology",
        "code": "PT",
        "description": "Studies the causes and effects of diseases through laboratory analysis",
        "image": "/uploads/specialties/pathology.jpg"
    },
    {
        "name": "General Surgery",
        "code": "GS",
        "description": "Involves surgical procedures for a wide range of conditions",
        "image": "/uploads/specialties/general_surgery.jpg"
    },
    {
        "name": "Urology",
        "code": "UR",
        "description": "Focuses on the urinary tract system and male reproductive organs",
        "image": "/uploads/specialties/urology.jpg"
    },
    {
        "name": "Dermatology",
        "code": "DM",
        "description": "Concerns the skin, hair, nails, and related disorders",
        "image": "/uploads/specialties/dermatology.jpg"
    },
    {
        "name": "Gastroenterology",
        "code": "GE",
        "description": "Specializes in the digestive system and its disorders",
        "image": "/uploads/specialties/gastroenterology.jpg"
    },
    {
        "name": "Nephrology",
        "code": "NP",
        "description": "Focuses on kidney health and diseases",
        "image": "/uploads/specialties/nephrology.jpg"
    },
    {
        "name": "Pulmonology",
        "code": "PL",
        "description": "Specializes in respiratory system diseases and conditions",
        "image": "/uploads/specialties/pulmonology.jpg"
    },
    {
        "name": "Psychiatry",
        "code": "PST",
        "description": "Focuses on the diagnosis and treatment of mental health disorders",
        "image": "/uploads/specialties/psychiatry.jpg"
    },
    {
        "name": "Endocrinology",
        "code": "EN",
        "description": "Deals with the endocrine system and its disorders",
        "image": "/uploads/specialties/endocrinology.jpeg"
    },
    {
        "name": "Rheumatology",
        "code": "RM",
        "description": "Focuses on the diagnosis and treatment of rheumatic diseases",
        "image": "/uploads/specialties/rheumatology.jpg"
    },
    {
        "name": "Anesthesiology",
        "code": "AN",
        "description": "Specializes in anesthesia and perioperative medicine",
        "image": "/uploads/specialties/anesthesiology.jpg"
    },
    {
        "name": "Intensive Care Unit (ICU)",
        "code": "ICU",
        "description": "Provides critical care for patients with severe or life-threatening conditions",
        "image": "/uploads/specialties/icu.jpg"
    },
    {
        "name": "Infectious Diseases",
        "code": "ID",
        "description": "Focuses on the diagnosis and treatment of infectious diseases",
        "image": "/uploads/specialties/infectious_diseases.jpg"
    },
    {
        "name": "Ophthalmology",
        "code": "OPH",
        "description": "Specializes in eye and vision care",
        "image": "/uploads/specialties/ophthalmology.jpg"
    },
    {
        "name": "Otorhinolaryngology (ENT)",
        "code": "ENT",
        "description": "Focuses on ear, nose, and throat disorders",
        "image": "/uploads/specialties/otorhinolaryngology.jpg"
    },
    {
        "name": "Hematology",
        "code": "HM",
        "description": "Focuses on blood disorders and diseases",
        "image": "/uploads/specialties/hematology.jpg"
    },
    {
        "name": "Physical Medicine and Rehabilitation",
        "code": "PMR",
        "description": "Focuses on restoring function and quality of life for patients with disabilities",
        "image": "/uploads/specialties/physical_medicine_rehabilitation.jpg"
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/user", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected.");

        // Optionally clear the collection before seeding
        await SpecialtyModel.deleteMany({});
        console.log("Cleared existing specialties.");

        // Insert the specialties
        await SpecialtyModel.insertMany(specialties);
        console.log("Specialties inserted successfully!");

        // Disconnect
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    } catch (error) {
        console.error("Error seeding specialties:", error);
        process.exit(1);
    }
}

seedDatabase();