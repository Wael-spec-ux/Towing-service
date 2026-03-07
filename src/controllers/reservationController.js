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
