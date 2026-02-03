import { Router } from 'express';
import { getTasks, createTask } from './task.controller.js';
import { validateCreateTask } from '../../middlewares/task-validators.js';

const router = Router();
router.get('/', getTasks);
router.post('/', validateCreateTask, createTask);

export default router;