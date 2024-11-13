const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: "GMAIL",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})


const emailStructure = (email, verificationToken) => {
    const verificationLink = `http://localhost:5001/verify-email?token=${verificationToken}`;

    const emailSent = {
        from: process.env.EMAIL,
        to: email,
        subject: "Here's your email verification by Y",
        text: `Click here for your email verification ${verificationLink}`
    }

    return transporter.sendMail(emailSent)
    
}


module.exports = emailStructure;