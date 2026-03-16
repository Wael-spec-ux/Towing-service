import Truck from '../models/truckModel.js';
export const createTruck = async (req, res) => {
  try {
    const { serialNumber, type, location, driver, lastMaintenanceDate, nextMaintenanceDate } = req.body;
    const truck = new Truck({ serialNumber, type, location, driver, lastMaintenanceDate, nextMaintenanceDate });
    await truck.save();
    res.status(201).json({ message: 'Truck created successfully', truck });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateTruck = async (req, res) => {
  try {
    const { id, serialNumber, type, location, driver, lastMaintenanceDate, nextMaintenanceDate } = req.body;
    const truck = await Truck.findById(id);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    const updatedTruck = await Truck.findByIdAndUpdate(id, { serialNumber, type, location, driver, lastMaintenanceDate, nextMaintenanceDate }, { new: true });
    res.status(200).json({ message: 'Truck updated successfully', truck: updatedTruck });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.status(200).json({ trucks });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const deleteTruck = async (req, res) => {
  try {
    const { id } = req.body;
    const truck = await Truck.findById(id);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    await Truck.findByIdAndDelete(id);
    res.status(200).json({ message: 'Truck deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};