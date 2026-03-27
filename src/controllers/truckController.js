import Truck from '../models/truckModel.js';
import Driver from '../models/DriverModel.js';
export const createTruck = async (req, res) => {
  try {
    const {plate,type,location,driver,lastMaintenance,nextMaintenance,status} = req.body;
    const truck = new Truck({type, location, driver, lastMaintenance, nextMaintenance,plate ,status});
    await truck.save();
    res.status(201).json({ message: 'Truck created successfully', truck });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
export const updateTruck = async (req, res) => {
  try {
    const { id,type, location, driver, lastMaintenance, nextMaintenance,plate ,status} = req.body;
    const truck = await Truck.findById(id);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    const updatedTruck = await Truck.findByIdAndUpdate(id, { serialNumber, type, location, driver, lastMaintenance, nextMaintenance,plate ,status}, { new: true });
    res.status(200).json({ message: 'Truck updated successfully', truck: updatedTruck });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.status(200).json(trucks);
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
    if (truck.driver) {
      const driver = await Driver.findOne({ name: truck.driver });
      if (driver) {
        driver.assignedTruck = null;
        await driver.save();
      }
    }

    await Truck.findByIdAndDelete(id);
    res.status(200).json({ message: 'Truck deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const assignTruckToDriver = async (req, res) => {
  try {
    const { truckPlate, driverName } = req.body;
    const driver = await Driver.findOne({ name: driverName });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    driver.assignedTruck = truckPlate;
    await driver.save();
    res.status(200).json({ message: 'Truck assigned to driver successfully', driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const AssignDriverToTruck = async (req, res) => {
  try {
    const { driverId, truckPlate } = req.body;

    const truck = await Truck.findOne({ plate:truckPlate });
    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    truck.driver = driver.name;
    await truck.save();

    res.status(200).json({ message: "driver assigned to truck" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};

export const getTruckByPlate = async (req, res) => {
  try {
    const { plate } = req.params;
    const truck = await Truck.findOne({ plate });
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    res.status(200).json(truck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTruckMaintenance = async (req, res) => {
  try {
    const {lastMaintenance} = req.body.lastMaintenance;
    const {nextMaintenance} = req.body.nextMaintenance;
    const {location} = req.body.location;
    const id = req.body.id;

    if (!id || !{lastMaintenance} || !{nextMaintenance} || !{location}) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const truck = await Truck.findById(id); 
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }

    truck.lastMaintenance = lastMaintenance;
    truck.nextMaintenance = nextMaintenance;
    truck.location = location;
    await truck.save();

    res.status(200).json({ message: 'Maintenance and location updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};