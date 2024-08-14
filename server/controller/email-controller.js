require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('../models/user');

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.example.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    
});
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}
// Function to send a verification email
async function sendVerificationEmail(email) {
    try {
        verificationCode= generateOTP()
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Your verification code for RoyalX is: ${verificationCode}`
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', result);
        return verificationCode;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
}

module.exports = sendVerificationEmail;
