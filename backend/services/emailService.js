const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use SendGrid/Mailgun
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;