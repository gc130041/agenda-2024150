import { Router } from 'express';
import { getTasks, createTask, getTaskById, updateTask } from './task.controller.js';
import { validateCreateTask, validateGetTaskById, validateUpdateTask } from '../../middlewares/task-validators.js';

const router = Router();
router.get('/', getTasks);
router.post('/', validateCreateTask, createTask);
router.get('/:id', validateGetTaskById, getTaskById);
router.put('/:id', validateUpdateTask, updateTask);
export default router;