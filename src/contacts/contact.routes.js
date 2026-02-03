import { Router } from 'express';
import { getContacts, createContact, getContactById, updateContact, toggleContactStatus } from './contact.controller.js';
import { validateCreateContact, validateGetContactById, validateUpdateContact } from '../../middlewares/contact-validators.js';
import { uploadContactImage } from '../../middlewares/file-uploader.js';

const router = Router();
router.get('/', getContacts);
router.post('/', uploadContactImage.single('image'), validateCreateContact, createContact);
router.get('/:id', validateGetContactById, getContactById);
router.put('/:id', uploadContactImage.single('image'), validateUpdateContact, updateContact);
router.put('/:id/status', validateGetContactById, toggleContactStatus);
export default router;