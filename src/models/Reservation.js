import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    carType: { type: String, required: true },

    serviceType: {
      type: String,
      enum: ['panne', 'transport'],
      required: true
    },

    // Panne fields
    problemDescription: { type: String },
    carLocation: { type: String },

    // Transport fields
    transportFrom: { type: String },
    transportTo: { type: String },
    transportTime: { type: Date },

    specialInstructions: { type: String },
    status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
    assignedDriver: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);
