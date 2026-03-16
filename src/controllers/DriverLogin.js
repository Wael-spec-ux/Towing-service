import Driver from "../models/DriverModel.js";
export const DriverLogin = async (req, res) => {
    try {
      const { email, AccountPassword } = req.body;
      const driver = await Driver.findOne({ email, AccountPassword });
      if (!driver) {
        return res.status(401).json({ message: 'Invalid credentials' });
      } else {
        res.status(200).json({ message: 'Login successful', driver });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while logging in' });
    }
    };
