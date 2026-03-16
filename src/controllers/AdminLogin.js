import Admin from "../models/AdminModel.js";
import jwt from 'jsonwebtoken';
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
        // On login success:
    const token = jwt.sign(
        { id: admin._id, role: admin.role }, // payload
        process.env.JWT_SECRET,           // secret key (keep it safe in .env)
        { expiresIn: '24h' }              // expiry
    );
    res.status(200).json({message: 'Login successful', admin ,token});
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while logging in' });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const { email, password, name , role} = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const admin = new Admin({ email, password, name, role });
    await admin.save();
    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while creating admin' });
    }
};