import multer from 'multer';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const createCloudinaryUploader = (folder) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: (req, file) => {
            const fileExt = extname(file.originalname);
            const baseName = file.originalname.replace(fileExt, '');
            const safeBase = baseName.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
            const publicId = `${safeBase}-${uuidv4().substring(0, 8)}`;

            return {
                folder: folder,
                public_id: publicId,
                allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
                resource_type: 'image',
            };
        },
    });

    return multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Formato no válido'));
            }
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    });
};

export const uploadUserImage = createCloudinaryUploader('agenda/users');
export const uploadContactImage = createCloudinaryUploader('agenda/contacts');
export { cloudinary };