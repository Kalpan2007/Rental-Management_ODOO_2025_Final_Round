const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use SendGrid/Mailgun
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  // Validate email recipient
  if (!to) {
    throw new Error('Email recipient is required');
  }

  // Validate email configuration
  if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASS) {
    throw new Error('Email service not properly configured');
  }

  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;