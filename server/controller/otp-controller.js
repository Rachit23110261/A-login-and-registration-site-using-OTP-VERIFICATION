require('dotenv').config();
const twilio = require('twilio');
const User = require('../models/user');

// Your Twilio account SID and auth token
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Send OTP to a phone number
async function sendOTP(phoneNumber) {
    try {
        const otp = generateOTP();
        const message = `Your OTP is: ${otp}`;

        const result = await client.messages.create({
            body: message,
            from: '+16562282118', // Your Twilio phone number
            to: phoneNumber
        });

        console.log(result.sid); // Output the message SID if successful
        return otp; // Return the result if needed
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error; // Throw the error to handle it in the calling code
    }
}

module.exports = sendOTP;


