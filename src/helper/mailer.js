import fs from "fs"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
})

const sendEmailVerification = async (target, emailVerificationLink) => {
    const html = fs
        .readFileSync(
            new URL("../view/emailVerification.html", import.meta.url),
            "utf-8"
        )
        .replace("{{emailVerificationLink}}", emailVerificationLink)

    await transporter.sendMail({
        to: target,
        subject: "[ZenFresh] Email Verification",
        html
    })
}

const sendPasswordResetEmail = async (target, passwordResetLink) => {
    const html = fs
        .readFileSync(
            new URL("../view/passwordReset.html", import.meta.url),
            "utf-8"
        )
        .replace("{{passwordResetLink}}", passwordResetLink)

    await transporter.sendMail({
        to: target,
        subject: "[ZenFresh] Password Reset",
        html
    })
}

export { sendEmailVerification, sendPasswordResetEmail }
