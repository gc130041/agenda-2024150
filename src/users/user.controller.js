import User from './user.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ status: true });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const filename = req.file.filename;
            userData.profilePicture = `${filename}.${extension}`;
        }
        const user = new User(userData);
        await user.save();
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const currentUser = await User.findById(id);
            if (currentUser?.profilePicture && !currentUser.profilePicture.includes('default_user')) {
                const publicId = currentUser.profilePicture.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`agenda/users/${publicId}`);
            }
            updateData.profilePicture = req.file.path;
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, message: 'Usuario actualizado', data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        user.status = !user.status;
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: `Usuario ${user.status ? 'activado' : 'desactivado'}`,
            status: user.status 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};