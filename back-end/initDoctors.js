const mongoose = require('mongoose');
const UserModel = require('./models/user');
const DoctorModel = require('./models/doctor');
const SpecialtyModel = require('./models/specialty');

const testDoctors = [
    {
      "firstname": "John",
      "lastname": "Smith",
      "email": "john.smith@example.com",
      "phone": "0800111222",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Neurology",
      "consultationFee": 180,
      "experience": "14 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Monday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Thursday", "startTime": "09:00", "endTime": "17:00" }
      ]
    },
    {
      "firstname": "Emily",
      "lastname": "Johnson",
      "email": "emily.johnson@example.com",
      "phone": "0800222333",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Pediatrics",
      "consultationFee": 190,
      "experience": "11 years",
      "languages": ["English", "Vietnamese"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Tuesday", "startTime": "10:00", "endTime": "18:00" },
        { "day": "Friday", "startTime": "10:00", "endTime": "18:00" }
      ]
    },
    {
      "firstname": "William",
      "lastname": "Brown",
      "email": "william.brown@example.com",
      "phone": "0800333444",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Cardiology",
      "consultationFee": 220,
      "experience": "17 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD, PhD",
      "availability": [
        { "day": "Monday", "startTime": "08:00", "endTime": "16:00" },
        { "day": "Wednesday", "startTime": "08:00", "endTime": "16:00" }
      ]
    },
    {
      "firstname": "Olivia",
      "lastname": "Davis",
      "email": "olivia.davis@example.com",
      "phone": "0800444555",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Dermatology",
      "consultationFee": 200,
      "experience": "9 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Wednesday", "startTime": "10:00", "endTime": "18:00" },
        { "day": "Saturday", "startTime": "09:00", "endTime": "13:00" }
      ]
    },
    {
      "firstname": "James",
      "lastname": "Miller",
      "email": "james.miller@example.com",
      "phone": "0800555666",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Endocrinology",
      "consultationFee": 210,
      "experience": "12 years",
      "languages": ["English", "Vietnamese"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Tuesday", "startTime": "08:00", "endTime": "16:00" },
        { "day": "Thursday", "startTime": "08:00", "endTime": "16:00" }
      ]
    },
    {
      "firstname": "Sophia",
      "lastname": "Wilson",
      "email": "sophia.wilson@example.com",
      "phone": "0800666777",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Cardiology",
      "consultationFee": 195,
      "experience": "10 years",
      "languages": ["English", "Vietnamese"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Monday", "startTime": "10:00", "endTime": "18:00" },
        { "day": "Thursday", "startTime": "10:00", "endTime": "18:00" }
      ]
    },
    {
      "firstname": "Michael",
      "lastname": "Moore",
      "email": "michael.moore@example.com",
      "phone": "0800777888",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Psychiatry",
      "consultationFee": 230,
      "experience": "20 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Tuesday", "startTime": "13:00", "endTime": "17:00" },
        { "day": "Friday", "startTime": "13:00", "endTime": "17:00" }
      ]
    },
    {
      "firstname": "Isabella",
      "lastname": "Taylor",
      "email": "isabella.taylor@example.com",
      "phone": "0800888999",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Ophthalmology",
      "consultationFee": 185,
      "experience": "8 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Wednesday", "startTime": "08:00", "endTime": "16:00" },
        { "day": "Friday", "startTime": "08:00", "endTime": "16:00" }
      ]
    },
    {
      "firstname": "Daniel",
      "lastname": "Anderson",
      "email": "daniel.anderson@example.com",
      "phone": "0800999000",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Otorhinolaryngology (ENT)",
      "consultationFee": 200,
      "experience": "13 years",
      "languages": ["English", "Vietnamese"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Monday", "startTime": "08:00", "endTime": "16:00" },
        { "day": "Thursday", "startTime": "08:00", "endTime": "16:00" }
      ]
    },
    {
      "firstname": "Charlotte",
      "lastname": "Thomas",
      "email": "charlotte.thomas@example.com",
      "phone": "0800111333",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Gastroenterology",
      "consultationFee": 215,
      "experience": "14 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Tuesday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Friday", "startTime": "09:00", "endTime": "17:00" }
      ]
    },
    {
      "firstname": "David",
      "lastname": "Jackson",
      "email": "david.jackson@example.com",
      "phone": "0800222444",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Neurology",
      "consultationFee": 185,
      "experience": "9 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Monday", "startTime": "10:00", "endTime": "18:00" },
        { "day": "Wednesday", "startTime": "10:00", "endTime": "18:00" }
      ]
    },
    {
      "firstname": "Grace",
      "lastname": "White",
      "email": "grace.white@example.com",
      "phone": "0800333555",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Pediatrics",
      "consultationFee": 175,
      "experience": "7 years",
      "languages": ["English", "Vietnamese"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Wednesday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Saturday", "startTime": "08:00", "endTime": "14:00" }
      ]
    },
    {
      "firstname": "Matthew",
      "lastname": "Harris",
      "email": "matthew.harris@example.com",
      "phone": "0800444666",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Cardiology",
      "consultationFee": 225,
      "experience": "18 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Tuesday", "startTime": "08:00", "endTime": "16:00" },
        { "day": "Thursday", "startTime": "08:00", "endTime": "16:00" }
      ]
    },
    {
      "firstname": "Chloe",
      "lastname": "Martin",
      "email": "chloe.martin@example.com",
      "phone": "0800555777",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Dermatology",
      "consultationFee": 195,
      "experience": "11 years",
      "languages": ["English"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Monday", "startTime": "09:00", "endTime": "17:00" },
        { "day": "Thursday", "startTime": "09:00", "endTime": "17:00" }
      ]
    },
    {
      "firstname": "Ethan",
      "lastname": "Thompson",
      "email": "ethan.thompson@example.com",
      "phone": "0800666888",
      "password": "password123",
      "role": "Doctor",
      "specialty": "Psychiatry",
      "consultationFee": 230,
      "experience": "16 years",
      "languages": ["English", "Vietnamese"],
      "title": "Dr.",
      "degree": "MD",
      "availability": [
        { "day": "Wednesday", "startTime": "13:00", "endTime": "17:00" },
        { "day": "Friday", "startTime": "13:00", "endTime": "17:00" }
      ]
    }
  ]
  

async function initializeDoctors() {
    try {
        // Clear existing doctors and their user accounts
        const existingDoctors = await DoctorModel.find();
        // for (const doctor of existingDoctors) {
        //     await UserModel.findByIdAndDelete(doctor.userId);
        // }
        await DoctorModel.deleteMany({});
        // console.log('Cleared existing doctors');

        // Create doctors
        for (const doctorData of testDoctors) {
            // Find specialty
            const specialty = await SpecialtyModel.findOne({ name: doctorData.specialty });
            if (!specialty) {
                console.error(`Specialty ${doctorData.specialty} not found`);
                continue;
            }

            // // Create user account
            // const hashedPassword = require('bcrypt').hashSync(doctorData.password, 10);
            // const user = new UserModel({
            //     firstname: doctorData.firstname,
            //     lastname: doctorData.lastname,
            //     email: doctorData.email,
            //     phone: doctorData.phone,
            //     password: hashedPassword,
            //     role: doctorData.role
            // });
            // await user.save();
            // console.log(`Created user account for Dr. ${doctorData.firstname} ${doctorData.lastname}`);

            // Create doctor profile
            const doctor = new DoctorModel({
                //userId: user._id,
                firstname: doctorData.firstname,
                lastname: doctorData.lastname,
                email: doctorData.email,
                specialty: specialty.name,
                consultationFee: doctorData.consultationFee,
                experience: doctorData.experience,
                languages: doctorData.languages,
                title: doctorData.title,
                degree: doctorData.degree,
                availability: doctorData.availability
            });
            await doctor.save();
            // console.log(`Created doctor profile for Dr. ${doctorData.firstname} ${doctorData.lastname}`);
        }

        // Verify the insertion
        // const count = await DoctorModel.countDocuments();
        // console.log(`Total doctors in database: ${count}`);

        // List all doctors with their details
        // const doctors = await DoctorModel.find()
        //     .populate('firstname', 'lastname')
        //     .populate('specialty', 'name');
        // console.log('Current doctors in database:', JSON.stringify(doctors, null, 2));

    } catch (error) {
        console.error('Error initializing doctors:', error);
        throw error;
    }
}

module.exports = { initializeDoctors }; 