import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateContact = [
    body('fullName').notEmpty().withMessage('Nombre es requerido'),
    body('phone').notEmpty().withMessage('Teléfono es requerido'),
    body('user').isMongoId().withMessage('ID de usuario no válido'),
    checkValidators
];