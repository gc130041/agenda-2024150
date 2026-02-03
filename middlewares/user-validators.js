import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateUser = [
    body('username').notEmpty().withMessage('Username es requerido'),
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isLength({ min: 6 }).withMessage('Password debe tener 6 caracteres'),
    checkValidators
];
export const validateGetUserById = [
    param('id').isMongoId().withMessage('ID no válido'),
    checkValidators
];

export const validateUpdateUser = [
    param('id').isMongoId().withMessage('ID no válido'),
    body('username').optional().notEmpty().withMessage('Username no puede estar vacío'),
    body('email').optional().isEmail().withMessage('Email no válido'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password debe tener 6 caracteres'),
    checkValidators
];