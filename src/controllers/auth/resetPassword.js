import Admin from "file:///C:/Users/asus/OneDrive/Desktop/CarsHelp/backend/src/models/AdminModel.js";
import Driver from "file:///C:/Users/asus/OneDrive/Desktop/CarsHelp/backend/src/models/DriverModel.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// ── 1) Request password reset ──────────────────────────────
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email }) || await Driver.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    // Generate a secure token (expires in 1 hour)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Save token + expiry to user (add these fields to your User model)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your Gmail address
        pass: process.env.EMAIL_PASS,     // Gmail App Password (not your real password!)
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}reset-password/${token}`;

    await transporter.sendMail({
      from: `"Top Depannage" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2 style="color: #1d4ed8;">Top Depannage</h2>
          <p>Bonjour <strong>${user.name}</strong>,</p>
          <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
          <a href="${resetUrl}" style="display:inline-block; padding:12px 24px; background:#1d4ed8; color:white; border-radius:8px; text-decoration:none; margin: 16px 0;">
            Réinitialiser le mot de passe
          </a>
          <p style="color:#666; font-size:13px;">Ce lien expire dans <strong>1 heure</strong>. Si vous n'avez pas demandé cela, ignorez cet email.</p>
        </div>
      `,
    });

    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ── 2) Verify token is valid ───────────────────────────────
export const verifyPasswordResetToken = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await Admin.findOne({
      _id: decoded.id,
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    }) || await Driver.findOne({
      _id: decoded.id,
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Token invalid or expired' });
    res.json({ message: 'Token valid' });
  } catch {
    res.status(400).json({ message: 'Token invalid or expired' });
  }
};

// ── 3) Reset the password ──────────────────────────────────
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await Admin.findOne({
      _id: decoded.id,
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    }) || await Driver.findOne({
      _id: decoded.id,
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: 'Token invalid or expired' });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined; // clear token
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch {
    res.status(400).json({ message: 'Token invalid or expired' });
  }
};
