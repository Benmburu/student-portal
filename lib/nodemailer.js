import nodemailer from "nodemailer";

// settings for the email sending function
const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})

export default transporter;