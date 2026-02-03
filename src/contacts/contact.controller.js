import Contact from './contact.model.js';
import { cloudinary } from '../../middlewares/file-uploader.js';

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ status: true });
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createContact = async (req, res) => {
    try {
        const contactData = req.body;
        if (req.file) {
            contactData.photo = req.file.path; 
        }
        const contact = new Contact(contactData);
        await contact.save();
        res.status(201).json({ success: true, data: contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ success: false, message: 'Contacto no encontrado' });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const current = await Contact.findById(id);
            if (current?.photo && !current.photo.includes('default_contact')) {
                const publicId = current.photo.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`agenda/contacts/${publicId}`);
            }
            updateData.photo = req.file.path;
        }

        const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const toggleContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ success: false, message: 'Contacto no encontrado' });

        contact.status = !contact.status;
        await contact.save();

        res.status(200).json({ 
            success: true, 
            message: `Contacto ${contact.status ? 'activado' : 'desactivado'}`,
            status: contact.status 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};