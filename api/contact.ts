import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      // Use your authenticated mailbox as the from
      from: `Contact Form <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER,
      subject: `Contact Form Submission from ${name}`,
      replyTo: email, // so you can reply directly to the sender
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p>${message.replace(/\n/g, '<br/>')}</p>`
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    // Optional: console.error(error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}