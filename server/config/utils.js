import jwt from "jsonwebtoken";
import cloudinary from 'cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //Ms
        httpOnly: true, //prevents XSS attcks from cross-site scripting attacks ,can be works through only http requests not with javascript commands
        sameSite: "strict", // CSRF attcks corss-site request frogery attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}
// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'freelancex_projects', // Folder in Cloudinary
        allowed_formats: ['pdf', 'doc', 'docx', 'jpg', 'png', 'zip'],
        resource_type: 'auto', // Automatically detect file type
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
}).array('files', 5); // Allow up to 5 files

// Upload files to local storage
export const uploadFiles = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                console.error('Upload error:', err);
                return res.status(400).json({ message: 'File upload failed', error: err.message });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'No files uploaded' });
            }

            // Extract file paths for local storage
            const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
            console.log('Files uploaded locally:', fileUrls);

            res.status(200).json({ message: 'Files uploaded successfully', fileUrls });
        });
    } catch (error) {
        console.error('Error in uploadFiles:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};