import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    photo: { type: String, default: 'agenda/default_contact' }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);