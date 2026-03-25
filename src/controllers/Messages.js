import Driver from "file:///C:/Users/asus/OneDrive/Desktop/CarsHelp/backend/src/models/DriverModel.js";
import nodemailer from 'nodemailer';

export const sendProblemMessage = async (req, res) => {
  const { type, description, email } = req.body;

  if (!type || !description || !email) {
    return res.status(400).json({ message: 'type, description and email are required' });
  }

  try {
    const user = await Driver.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transport.sendMail({
      from: `"Top Depannage" <${process.env.EMAIL_USER}>`,
      replyTo: user.email,  // ✅ admin can reply directly to the driver
      to: process.env.EMAIL_USER,
      subject: `Driver Problem Report: ${type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2 style="color: #1d4ed8;">Top Depannage</h2>
          <p>Bonjour <strong>Admin</strong>,</p>
          <p>Driver <strong>${user.name}</strong> (${user.email}) reported a problem:</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Description:</strong> ${description}</p>
        </div>
      `,
    });

    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const RequestRestDay = async (req, res) => {
  const { type, description, email } = req.body;

  if (!type || !description || !email) {
    return res.status(400).json({ message: 'type, description and email are required' });
  }

  try {
    const user = await Driver.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transport.sendMail({
      from: `"Top Depannage" <${process.env.EMAIL_USER}>`,
      replyTo: user.email,
      to: process.env.EMAIL_USER,
      subject: `Driver Request: ${type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2 style="color: #1d4ed8;">Top Depannage</h2>
          <p>Bonjour <strong>Admin</strong>,</p>
          <p>Chauffeur :<strong>${user.name}</strong> (${user.email}) Signalé Besoin d'un jour de repos :</p>
          <p><strong>Combien de jours:</strong> ${type}</p>
          <p><strong>Description:</strong> ${description}</p>
        </div>
      `,
    });

    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};