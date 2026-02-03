import User from './user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
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