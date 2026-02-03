import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['PENDING', 'COMPLETED'], default: 'PENDING' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);