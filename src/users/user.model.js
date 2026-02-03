import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: 'agenda/default_user' },
    status: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);