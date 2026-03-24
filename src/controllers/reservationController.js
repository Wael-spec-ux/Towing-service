import e from 'express';
import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
  try {
    const data = req.body;

    // Basic validation
    if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.carType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['panne', 'transport'].includes(data.serviceType)) {
      return res.status(400).json({ message: 'Invalid service type' });
    }

    // Service-specific validation
    if (data.serviceType === 'panne') {
      if (!data.problemDescription || !data.carLocation) {
        return res.status(400).json({ message: 'Panne details are required' });
      }
    }

    if (data.serviceType === 'transport') {
      if (!data.transportFrom || !data.transportTo || !data.transportTime) {
        return res.status(400).json({ message: 'Transport details are required' });
      }
    }

    const reservation = new Reservation(data);
    await reservation.save();

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  };
  
export const editReservation = async (req, res) => {
  try {
    const { id, status, assignedDriver } = req.body;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    if (status) reservation.status = status;
    if (assignedDriver) reservation.assignedDriver = assignedDriver;
    await reservation.save();
    res.status(200).json({ message: 'Reservation updated successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.body;
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAssignedDriverAndStatus = async (req, res) => {
  try {
    const { id, assignedDriver, status } = req.body; 
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    reservation.assignedDriver = assignedDriver;
    reservation.status = status;
    await reservation.save();
    res.status(200).json({ message: 'Assigned driver and statusupdated successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const findTasksByAssignedDriverEqualsToDriverId = async (req, res) => {
  try {
    const { driverId } = req.params;
    const tasks = await Reservation.find({ assignedDriver: driverId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const changeTaskStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ message: 'id and status are required' });
    }

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'No Task found' });
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({ message: 'Status changed', reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};