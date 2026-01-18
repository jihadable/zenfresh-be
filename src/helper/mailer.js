const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
})

const sendEmailVerification = async(target, emailVerificationLink) => {
    const htmlPath = path.join(__dirname, "../view/emailVerification.html")
    let html = fs.readFileSync(htmlPath, "utf-8");
    html = html.replace("{{emailVerificationLink}}", emailVerificationLink)
    
    await transporter.sendMail({
        to: target,
        subject: "[ZenFresh] Email Verification",
        html
    })
}

const sendPasswordResetEmail = async(target, passwordResetLink) => {
    const htmlPath = path.join(__dirname, "../view/passwordReset.html")
    let html = fs.readFileSync(htmlPath, "utf-8");
    html = html.replace("{{passwordResetLink}}", passwordResetLink)
    
    await transporter.sendMail({
        to: target,
        subject: "[ZenFresh] Password Reset",
        html
    })
}

module.exports = { sendEmailVerification, sendPasswordResetEmail }