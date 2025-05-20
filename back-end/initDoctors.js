const UserModel = require('./models/user');
const DoctorModel = require('./models/doctor');
const SpecialtyModel = require('./models/specialty');
const doctors = require('./utils/doctors');
  
async function initializeDoctors() {
    try {
        // clear doctors collection
        await DoctorModel.deleteMany();

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
            const existingDoctor = await DoctorModel.findOne({ email: doctorData.email });

            if (existingUser) {
                if(!existingDoctor) {
                    // Create doctor profile
                    const doctor = new DoctorModel({
                    doctorId: existingUser.userId,
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
                }
            }
            else 
            {
                // Create user account for doctor
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
            }
            
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