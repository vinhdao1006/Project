import specialties from './data/specialties.js';

const mongoose = require('mongoose');
const SpecialtyModel = require('../models/specialty.js');
const DoctorModel = require('../models/doctor.js');
const UserModel = require('../models/user.js');

mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/user");

const seedDatabase = async () => {
    try {
        // Clear existing data
        await SpecialtyModel.deleteMany({});
        await DoctorModel.deleteMany({});

        // Insert specialties
        const insertedSpecialties = await SpecialtyModel.insertMany(specialties);
        console.log('Specialties seeded successfully');

        // Create a sample doctor user
        const doctorUser = await UserModel.create({
            firstname: "John",
            lastname: "Smith",
            email: "dr.smith@example.com",
            phone: "1234567890",
            password: "hashedpassword",
            role: "Doctor"
        });

        // Create a sample doctor
        const doctor = await DoctorModel.create({
            userId: doctorUser._id,
            specialty: insertedSpecialties[0]._id, // Cardiology
            availability: [
                {
                    day: "Monday",
                    startTime: "09:00",
                    endTime: "17:00"
                },
                {
                    day: "Wednesday",
                    startTime: "09:00",
                    endTime: "17:00"
                },
                {
                    day: "Friday",
                    startTime: "09:00",
                    endTime: "17:00"
                }
            ],
            consultationFee: 150,
            experience: "15 years of experience in cardiology",
            education: ["MD from Harvard Medical School", "Board Certified in Cardiology"],
            languages: ["English", "Spanish"]
        });

        console.log('Doctor seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase(); 