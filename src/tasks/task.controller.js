import Task from './task.model.js';

export const getTasks = async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { user: userId } : {};
        const tasks = await Task.find(filter);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};