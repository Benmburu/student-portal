import nodemailer from "nodemailer";

// settings for the email sending function
const transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
        user: process.env.GMAIL_USER as string,
        pass: process.env.GMAIL_PASS as string,
    }
})

export default transporter;