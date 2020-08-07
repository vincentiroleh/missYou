const nodemailer = require('nodemailer');

async function mailer(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  const info = await transporter.sendMail({
    from: `${process.env.app_name} <${process.env.user}>`,
    to,
    subject,
    html: text,
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = mailer;
