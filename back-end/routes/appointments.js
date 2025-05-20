const AppointmentModel = require('../models/appointment');
const DoctorModel = require('../models/doctor');
const UserModel = require('../models/user');
const SpecialtyModel = require('../models/specialty');
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Cấu hình Nodemailer với Gmail SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS cho port 587
    auth: {
        user: process.env.EMAIL_USER, // Email từ .env
        pass: process.env.EMAIL_PASS, // App Password từ .env
    },
});

// Create new appointment
router.post('/', async (req, res) => {
    try {
        const { patientId, fullname, gender, dayOfBirth, doctorId, specialtyId, appointmentDate, appointmentTime, reason, email } = req.body;
        
        // Check if the time slot is available
        const existingAppointment = await AppointmentModel.findOne({
            doctorId,
            appointmentDate,
            appointmentTime,
            status: { $in: ['Pending', 'Confirmed'] }
        });

        if (existingAppointment) {
            return res.status(400).json({ error: 'This time slot is already booked' });
        }

        // Create new appointment
        const appointment = new AppointmentModel({
            patientId,
            fullname,
            gender,
            dayOfBirth,
            doctorId,
            specialtyId,
            appointmentDate,
            appointmentTime,
            reason,
            email,
        });

        await appointment.save();

        // Fetch doctor details for email
        const doctor = await DoctorModel.findOne({ doctorId });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Fetch specialty details for email
        const specialty = await SpecialtyModel.findOne({ name: specialtyId });
        if (!specialty) {
            return res.status(404).json({ error: 'Specialty not found' });
        }

        // Prepare email content
        const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Parse appointment time to display in a more readable format
        const timeRange = appointmentTime.includes('-') 
            ? appointmentTime 
            : `${appointmentTime} - ${addMinutesToTime(appointmentTime, 30)}`; // Add 30 min if no range

        const mailOptions = {
            from: `"Bimec Hospital" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your Appointment Confirmation - Bimec Hospital',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <div style="text-align: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 3px solid #285430;">
                        <h1 style="color: #285430; margin-bottom: 5px; font-size: 24px;">Appointment Confirmed</h1>
                        <p style="color: #666; font-size: 16px;">Thank you for choosing Bimec Hospital</p>
                    </div>
                    
                    <div style="margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                        <h2 style="color: #285430; font-size: 18px; margin-top: 0;">Dear ${fullname},</h2>
                        <p style="color: #444; line-height: 1.5;">
                            Your appointment has been successfully scheduled. Please find your appointment details below:
                        </p>
                    </div>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; width: 40%;">
                                <img src="https://img.icons8.com/ios-filled/20/285430/doctor-male.png" style="vertical-align: middle; margin-right: 8px;">
                                Doctor:
                            </td>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600;">
                                Dr. ${doctor.firstname} ${doctor.lastname}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
                                <img src="https://img.icons8.com/ios-filled/20/285430/stethoscope.png" style="vertical-align: middle; margin-right: 8px;">
                                Specialty:
                            </td>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600;">
                                ${specialtyId}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
                                <img src="https://img.icons8.com/ios-filled/20/285430/calendar.png" style="vertical-align: middle; margin-right: 8px;">
                                Date:
                            </td>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600;">
                                ${formattedDate}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
                                <img src="https://img.icons8.com/ios-filled/20/285430/time.png" style="vertical-align: middle; margin-right: 8px;">
                                Time:
                            </td>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: 600;">
                                ${timeRange}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666;">
                                <img src="https://img.icons8.com/ios-filled/20/285430/document.png" style="vertical-align: middle; margin-right: 8px;">
                                Reason:
                            </td>
                            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                                ${reason}
                            </td>
                        </tr>
                    </table>
                    
                    <div style="margin-bottom: 20px; padding: 15px; background-color: #f0f7f0; border-left: 4px solid #285430; border-radius: 3px;">
                        <h3 style="color: #285430; margin-top: 0; font-size: 16px;">
                            <img src="https://img.icons8.com/ios-filled/20/285430/info.png" style="vertical-align: middle; margin-right: 8px;">
                            Important Information:
                        </h3>
                        <ul style="color: #444; padding-left: 20px; margin-bottom: 0;">
                            <li style="margin-bottom: 8px;">Please arrive 15 minutes before your appointment time.</li>
                            <li style="margin-bottom: 8px;">Bring any previous medical records or test results if applicable.</li>
                            <li style="margin-bottom: 8px;">If you need to cancel or reschedule, please do so at least 24 hours in advance.</li>
                            <li style="margin-bottom: 0;">Face masks are required in all clinical areas.</li>
                        </ul>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; border-radius: 5px; background-color: #eff7ff; text-align: center;">
                        <p style="margin: 0; color: #444;">
                            <img src="https://img.icons8.com/ios-filled/20/285430/phone.png" style="vertical-align: middle; margin-right: 8px;">
                            For assistance, please call: <strong>(028) 3864-7256</strong>
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #999; font-size: 14px;">
                            This is an automated message, please do not reply to this email.
                        </p>
                        <p style="color: #999; font-size: 12px; margin-top: 20px;">
                            © ${new Date().getFullYear()} Bimec Hospital. All rights reserved.
                        </p>
                    </div>
                </div>
            `,
        };

        // Helper function to add minutes to a time string (e.g., "09:00" -> "09:30")
        function addMinutesToTime(timeStr, minutesToAdd) {
            const [hours, minutes] = timeStr.split(':').map(Number);
            let totalMinutes = hours * 60 + minutes + minutesToAdd;
            
            const newHours = Math.floor(totalMinutes / 60);
            const newMinutes = totalMinutes % 60;
            
            return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
        }

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to:', email);

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get patient's appointments
router.get('/:patientId', async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({ patientId: req.params.patientId })
            .sort({ appointmentDate: 1 });

        // Fetch doctor info for each appointment
        const doctorIds = appointments.map(appt => appt.doctorId);
        const doctors = await DoctorModel.find({ doctorId: { $in: doctorIds } });

        // Map doctorId to doctor info
        const doctorMap = {};
        doctors.forEach(doc => {
            doctorMap[doc.doctorId] = {
                firstname: doc.firstname,
                lastname: doc.lastname,
            };
        });

        // Attach doctor info to each appointment
        const appointmentsWithDoctor = appointments.map(appt => ({
            ...appt.toObject(),
            doctorInfo: doctorMap[appt.doctorId] || null
        }));

        res.json(appointmentsWithDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all appointments 
router.get('/', async (req, res) => {
    try {
        const appointments = await AppointmentModel.find().sort({ appointmentDate: 1 });

        // Collect unique patientIds and doctorIds
        const patientIds = [...new Set(appointments.map(a => a.patientId))];
        const doctorIds = [...new Set(appointments.map(a => a.doctorId))];

        // Fetch user and doctor info
        const users = await UserModel.find({ userId: { $in: patientIds } });
        const doctors = await DoctorModel.find({ doctorId: { $in: doctorIds } });

        // Map for quick lookup
        const userMap = {};
        users.forEach(u => {
            userMap[u.userId] = { firstname: u.firstname, lastname: u.lastname };
        });
        const doctorMap = {};
        doctors.forEach(d => {
            doctorMap[d.doctorId] = { firstname: d.firstname, lastname: d.lastname };
        });

        // Attach info to each appointment
        const appointmentsWithInfo = appointments.map(a => ({
            ...a.toObject(),
            patientInfo: userMap[a.patientId] || null,
            doctorInfo: doctorMap[a.doctorId] || null,
        }));

        res.json(appointmentsWithInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;