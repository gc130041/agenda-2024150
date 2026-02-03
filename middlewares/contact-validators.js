import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateContact = [
    body('fullName').notEmpty().withMessage('Nombre es requerido'),
    body('phone').notEmpty().withMessage('Teléfono es requerido'),
    checkValidators
];
export const validateGetContactById = [
    param('id').isMongoId().withMessage('ID no válido'),
    checkValidators
];

export const validateUpdateContact = [
    param('id').isMongoId().withMessage('ID no válido'),
    body('fullName').optional().notEmpty(),
    body('phone').optional().notEmpty(),
    checkValidators
];