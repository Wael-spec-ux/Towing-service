import mongoose from "mongoose";
const driverSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone : { type: String, required: true },
        status:{ type: String, enum: ['available', 'En mission','Problème camion'], default: 'available' },
        currentLocation: { type: String ,default:"ben arouss" },
        email: { type: String, required: true, lowercase: true },
        password: { type: String, required: true },
        assignedTruck : { type: String , default: null },
        missions: { type: Boolean, default: false },
        licenceNumber: { type: String, required: true },
        truckId: { type: String,default: null },
        rating: { type: Number, min: 1, max: 5  ,default: 5 },
        role: { type: String, default: 'driver' },
        resetPasswordToken: { type: String ,default: null },
        resetPasswordExpires: { type: Date ,default: null }

    },
    { timestamps: true }
);
export default mongoose.model('Driver', driverSchema);