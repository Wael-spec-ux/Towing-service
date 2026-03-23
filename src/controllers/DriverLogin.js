import Driver from "../models/DriverModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const DriverLogin = async (req, res) => {
    try {
      const { email,password } = req.body;
      const driver = await Driver.findOne({ email});
      const isMatch = await bcrypt.compare(password, driver.password);
      if (!driver || !isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      } else {
        const DriverToken = jwt.sign(
          { id: driver._id, role: 'driver' }, // payload
          process.env.JWT_SECRET,           // secret key
          { expiresIn: '24h' }              // expiry
        );
        res.status(200).json({ message: 'Login successful', driver, DriverToken});
      }
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while logging in'});
    }
    };
