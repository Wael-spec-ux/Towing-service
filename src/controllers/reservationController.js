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
