import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema(
  {
    plate: { type: String, required: true},
    type: { type: String, required: true },
    location: { type: String, required: true },
    driver: { type: String, default: null },
    lastMaintenance: { type: Date, default: null },
    nextMaintenance: { type: Date, default: null },
    status: { type: String, enum: ['Opérationnel', 'En mission', 'En réparation'], default: 'Opérationnel' },

  },
  { timestamps: true }
);
export default mongoose.model('Truck', truckSchema);