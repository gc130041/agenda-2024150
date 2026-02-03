import { Router } from 'express';
import { getUsers, createUser } from './user.controller.js';
import { validateCreateUser } from '../../middlewares/user-validators.js';
import { uploadUserImage } from '../../middlewares/file-uploader.js';

const router = Router();
router.get('/', getUsers);
router.post('/', uploadUserImage.single('image'), validateCreateUser, createUser);

export default router;