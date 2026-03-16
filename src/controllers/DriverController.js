import Driver from '../models/DriverModel.js';
export const createDriver = async (req, res) => {
  try {
    const { name, phone, email, licenceNumber,assignedTruck, AccountPassword } = req.body;
    const driver = new Driver({ name, phone, email, licenceNumber, assignedTruck, AccountPassword });
    await driver.save();
    res.status(201).json({ message: 'Driver created successfully', driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateDriver = async (req, res) => {
  try {
    const { id,name,phone,email,licenceNumber, status, currentLocation, assignedTruck, missions, truckId, rating } = req.body;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    const updatedDriver = await Driver.findByIdAndUpdate(id, { name, phone, email, licenceNumber, status, currentLocation, assignedTruck, missions, truckId, rating }, { new: true });
    res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json({ drivers });
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};