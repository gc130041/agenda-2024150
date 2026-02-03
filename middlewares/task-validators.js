import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTask = [
    body('title').notEmpty().withMessage('Título es requerido'),
    checkValidators
];
export const validateGetTaskById = [
    param('id').isMongoId().withMessage('ID no válido'),
    checkValidators
];

export const validateUpdateTask = [
    param('id').isMongoId().withMessage('ID no válido'),
    body('title').optional().notEmpty(),
    body('status').optional().isIn(['PENDING', 'COMPLETED']),
    checkValidators
];