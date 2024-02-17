import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { htmlCode } from "./emailTemplate.js";

export const sendEmail = async(email)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS,
        }
    });
    let token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1h' })
    const info = await transporter.sendMail({
    from: `'E-Commerce App'<${process.env.EMAIL_NAME}>`,
    to: email,
    subject: 'hello',
    text: htmlCode(token)
    });
    console.log("Message sent: %s", info.messageId);
} 