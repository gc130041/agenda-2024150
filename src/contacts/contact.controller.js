import Contact from './contact.model.js';

export const getContacts = async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { user: userId } : {};
        const contacts = await Contact.find(filter).populate('user', 'username');
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createContact = async (req, res) => {
    try {
        const contactData = req.body;
        if (req.file) {
            const extension = req.file.path.split('.').pop();
            const filename = req.file.filename;
            contactData.photo = `${filename}.${extension}`;
        }
        const contact = new Contact(contactData);
        await contact.save();
        res.status(201).json({ success: true, data: contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};