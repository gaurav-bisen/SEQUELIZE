import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config();

console.log('EMAIL =>', process.env.EMAIL);
console.log('PASSWORD =>', process.env.PASSWORD);


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});


class Mail {
    constructor() {
        this.mailOptions = {
            from: {
                address: process.env.EMAIL,
                name: "Gaurav"
            }
        }
    }

    setCompanyName(name) {
        this.mailOptions.from.name = name;
    }

    setSenderEmail(email) {
        this.mailOptions.from.address = email;
    }

    setHtml(html) {
        this.mailOptions.html = html;
    }

    setTo(receiver) {
        this.mailOptions.to = receiver;
    }

    setSubject(subject) {
        this.mailOptions.subject = subject;
    }

    setText(text) {
        this.mailOptions.text = text;
    }

    async send() {
        try {
            console.log('Sending to:', this.mailOptions.to);
            console.log('Mail options:', this.mailOptions);
            const info = await transporter.sendMail(this.mailOptions);
            console.log('email send :', info.response);
        } catch (error) {
            console.log('Email error: ', error);
        }
    }

    async sendVerificationEmail(token, email) {
        const verifyLink = `${process.env.BACKEND_URL}/api/v1/users/verify_email?token=${token}`;

        await transporter.sendMail({
            from: {
                address: process.env.EMAIL,
                name: "Gaurav"
            },
            to: email,
            subject: 'Verify your email',
            html: `
                <h3>Email Verification</h3>
                <p>Click the link below to verify your email:</p>
                <a href="${verifyLink}">Verify Email</a>
            `
        })
    }

    async sendResetPasswordEmail(token, email) {

        await transporter.sendMail({
            from: {
                address: process.env.EMAIL,
                name: "Gaurav"
            },
            to: email,
            subject: 'Reset Password',
            html: `
                <h3>RESET Password!</h3>
                <p>Click the link below to reset your password:</p>
                <p>reset password token: ${token}</p>
            `
        })
    }
}

export default new Mail();
