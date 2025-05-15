const mongoose = require('mongoose');
const UserModel = require('./models/user');
const DoctorModel = require('./models/doctor');
const SpecialtyModel = require('./models/specialty');

// Connect to MongoDB
// mongoose.connect("mongodb+srv://vinhdao1006:VinhDao1006@cluster0.yfwoj.mongodb.net/user")
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

const testDoctors = [
    {
        firstname: "John",
        lastname: "Smith",
        email: "john.smith@example.com",
        phone: "1234567890",
        password: "password123",
        role: "Doctor",
        specialty: "Neurology",
        consultationFee: 150,
        experience: "15 years",
        languages: ["English", "Spanish"],
        title: "Dr.",
        degree: "MD, PhD",
        availability: [
            { day: "Monday", startTime: "09:00", endTime: "17:00" },
            { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
            { day: "Friday", startTime: "09:00", endTime: "17:00" }
        ]
    },
    {
        firstname: "Sarah",
        lastname: "Johnson",
        email: "sarah.johnson@example.com",
        phone: "2345678901",
        password: "password123",
        role: "Doctor",
        specialty: "Cardiology",
        consultationFee: 200,
        experience: "20 years",
        languages: ["English", "French"],
        title: "Dr.",
        degree: "MD",
        availability: [
            { day: "Tuesday", startTime: "09:00", endTime: "17:00" },
            { day: "Thursday", startTime: "09:00", endTime: "17:00" }
        ]
    },
    {
        firstname: "Michael",
        lastname: "Chen",
        email: "michael.chen@example.com",
        phone: "3456789012",
        password: "password123",
        role: "Doctor",
        specialty: "Ophthalmology",
        consultationFee: 175,
        experience: "12 years",
        languages: ["English", "Chinese", "Japanese"],
        title: "Dr.",
        degree: "MD",
        availability: [
            { day: "Monday", startTime: "10:00", endTime: "18:00" },
            { day: "Wednesday", startTime: "10:00", endTime: "18:00" },
            { day: "Friday", startTime: "10:00", endTime: "18:00" }
        ]
    },
    {
        firstname: "Emily",
        lastname: "Brown",
        email: "emily.brown@example.com",
        phone: "4567890123",
        password: "password123",
        role: "Doctor",
        specialty: "Dermatology",
        consultationFee: 160,
        experience: "10 years",
        languages: ["English"],
        title: "Dr.",
        degree: "MD",
        availability: [
            { day: "Tuesday", startTime: "09:00", endTime: "17:00" },
            { day: "Thursday", startTime: "09:00", endTime: "17:00" },
            { day: "Saturday", startTime: "09:00", endTime: "13:00" }
        ]
    }
];

async function initializeDoctors() {
    try {
        // Clear existing doctors and their user accounts
        const existingDoctors = await DoctorModel.find();
        for (const doctor of existingDoctors) {
            await UserModel.findByIdAndDelete(doctor.userId);
        }
        await DoctorModel.deleteMany({});
        console.log('Cleared existing doctors');

        // Create doctors
        for (const doctorData of testDoctors) {
            // Find specialty
            const specialty = await SpecialtyModel.findOne({ name: doctorData.specialty });
            if (!specialty) {
                console.error(`Specialty ${doctorData.specialty} not found`);
                continue;
            }

            // Create user account
            const hashedPassword = require('bcrypt').hashSync(doctorData.password, 10);
            const user = new UserModel({
                firstname: doctorData.firstname,
                lastname: doctorData.lastname,
                email: doctorData.email,
                phone: doctorData.phone,
                password: hashedPassword,
                role: doctorData.role
            });
            await user.save();
            console.log(`Created user account for Dr. ${doctorData.firstname} ${doctorData.lastname}`);

            // Create doctor profile
            const doctor = new DoctorModel({
                userId: user._id,
                specialty: specialty._id,
                consultationFee: doctorData.consultationFee,
                experience: doctorData.experience,
                languages: doctorData.languages,
                title: doctorData.title,
                degree: doctorData.degree,
                availability: doctorData.availability
            });
            await doctor.save();
            console.log(`Created doctor profile for Dr. ${doctorData.firstname} ${doctorData.lastname}`);
        }

        // Verify the insertion
        const count = await DoctorModel.countDocuments();
        console.log(`Total doctors in database: ${count}`);

        // List all doctors with their details
        const doctors = await DoctorModel.find()
            .populate('userId', 'firstname lastname email')
            .populate('specialty', 'name');
        console.log('Current doctors in database:', JSON.stringify(doctors, null, 2));

    } catch (error) {
        console.error('Error initializing doctors:', error);
        throw error;
    }
}

module.exports = { initializeDoctors }; 