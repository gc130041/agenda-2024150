import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateUser = [
    body('username').notEmpty().withMessage('Username es requerido'),
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isLength({ min: 6 }).withMessage('Password debe tener 6 caracteres'),
    checkValidators
];