import Driver from '../models/DriverModel.js';
import bcrypt from 'bcryptjs';
export const createDriver = async (req, res) => {
  try {
    const { name, phone, email, licenceNumber,password,truckId} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const driver = new Driver({ name, phone, email, licenceNumber, password: hashedPassword, truckId });
    await driver.save();
    res.status(201).json({ message: 'Driver created successfully', driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateDriver = async (req, res) => {
  try {
    const { id,name,phone,email,licenceNumber, status, currentLocation, assignedTruck, missions, truckId, rating ,password} = req.body;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    const updatedDriver = await Driver.findByIdAndUpdate(id, { name, phone, email, licenceNumber, status, currentLocation, assignedTruck, missions, truckId, rating, password }, { new: true });
    res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateDriverStatusAndMissions = async (req, res) => {
  try {
    const { id,status,missions} = req.body;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    const updatedDriver = await Driver.findByIdAndUpdate(id, { status, missions }, { new: true });
    res.status(200).json({ message: 'Driver status and missions updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const deleteDriver = async (req, res) => {
  try {
    const { id } = req.body;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    await Driver.findByIdAndDelete(id);
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateDriverStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    driver.status = status;
    await driver.save();
    res.status(200).json({ message: 'Driver status updated successfully', driver });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};