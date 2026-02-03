import Task from './task.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ isActive: true });
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
export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ success: false, message: 'Tarea no encontrada' });
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const toggleTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ success: false, message: 'Tarea no encontrada' });

        task.isActive = !task.isActive;
        await task.save();

        res.status(200).json({ 
            success: true, 
            message: `Tarea ${task.isActive ? 'activada' : 'desactivada'}`,
            isActive: task.isActive 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};