import { Router } from 'express';
import { getUsers, createUser, getUserById, updateUser } from './user.controller.js';
import { validateCreateUser, validateGetUserById, validateUpdateUser } from '../../middlewares/user-validators.js';
import { uploadUserImage } from '../../middlewares/file-uploader.js';

const router = Router();
router.get('/', getUsers);
router.post('/', uploadUserImage.single('image'), validateCreateUser, createUser);
router.get('/:id', validateGetUserById, getUserById);
router.put('/:id', uploadUserImage.single('image'), validateUpdateUser, updateUser);
export default router;