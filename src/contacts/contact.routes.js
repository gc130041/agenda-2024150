import { Router } from 'express';
import { getContacts, createContact } from './contact.controller.js';
import { validateCreateContact } from '../../middlewares/contact-validators.js';
import { uploadContactImage } from '../../middlewares/file-uploader.js';

const router = Router();
router.get('/', getContacts);
router.post('/', uploadContactImage.single('image'), validateCreateContact, createContact);

export default router;