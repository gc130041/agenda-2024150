import { Router } from 'express';
import { getTasks, createTask, getTaskById, updateTask, toggleTaskStatus } from './task.controller.js';
import { validateCreateTask, validateGetTaskById, validateUpdateTask } from '../../middlewares/task-validators.js';

const router = Router();
router.get('/', getTasks);
router.post('/', validateCreateTask, createTask);
router.get('/:id', validateGetTaskById, getTaskById);
router.put('/:id', validateUpdateTask, updateTask);
router.put('/:id/status', validateGetTaskById, toggleTaskStatus);
export default router;