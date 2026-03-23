import mongoose from "mongoose";
const adminSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, default: 'admin' },
        resetPasswordToken: { type: String ,default: null },
        resetPasswordExpires: { type: Date ,default: null }
    }
);
export default mongoose.model('Admin', adminSchema);