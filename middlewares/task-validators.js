import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTask = [
    body('title').notEmpty().withMessage('Título es requerido'),
    body('user').isMongoId().withMessage('ID de usuario no válido'),
    checkValidators
];