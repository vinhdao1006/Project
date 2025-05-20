const UserModel = require('./models/user');
const DoctorModel = require('./models/doctor');
const SpecialtyModel = require('./models/specialty');
const doctors = require('./utils/doctors');
  
async function initializeDoctors() {
    try {
        // Create doctors
        for (const doctorData of doctors) {
            // Find specialty
            const specialty = await SpecialtyModel.findOne({ name: doctorData.specialty });
            if (!specialty) {
                console.error(`Specialty ${doctorData.specialty} not found`);
                continue;
            }

            // Check if user already exists
            const existingUser = await UserModel.findOne({ email: doctorData.email });
            if (existingUser) {
                // console.log(`User with email ${doctorData.email} already exists, skipping.`);
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
            // console.log(`Created user account for Dr. ${doctorData.firstname} ${doctorData.lastname}`);

            // Create doctor profile
            const doctor = new DoctorModel({
                doctorId: user.userId,
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