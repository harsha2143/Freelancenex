import Project from '../models/Project.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// Upload files to Cloudinary
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

            // Extract secure URLs from Cloudinary response
            const fileUrls = req.files.map(file => file.secure_url);
            console.log('Files uploaded to Cloudinary:', fileUrls);

            res.status(200).json({ message: 'Files uploaded successfully', fileUrls });
        });
    } catch (error) {
        console.error('Error in uploadFiles:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add project
export const addProject = async (req, res) => {
    try {
        const { title, description, budget, deadline, requiredSkills, customSkills, client, category, experienceLevel, files } = req.body;

        console.log('Received project data:', req.body);

        // Validate required fields
        if (!title || !description || !budget || !deadline || !requiredSkills || !client || !category || !experienceLevel) {
            console.log('Missing required fields:', { title, description, budget, deadline, requiredSkills, client, category, experienceLevel });
            return res.status(400).json({ message: 'All fields are required', received: req.body });
        }

        // Validate that client ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(client)) {
            console.log('Invalid client ID format:', client);
            return res.status(400).json({ message: 'Invalid client ID format' });
        }

        // Check if client exists in database
        const Client = mongoose.model('Client');
        const clientExists = await Client.findById(client);
        if (!clientExists) {
            console.log('Client not found in database:', client);
            return res.status(400).json({ message: 'Client not found in database' });
        }

        console.log('Creating project with data:', {
            title,
            description,
            budget: Number(budget),
            deadline: new Date(deadline),
            requiredSkills,
            customSkills,
            client,
            category,
            experienceLevel,
            files,
        });

        // Create a new project
        const newProject = new Project({
            title,
            description,
            budget: Number(budget),
            deadline: new Date(deadline),
            requiredSkills,
            customSkills: customSkills || [],
            client,
            category,
            experienceLevel,
            files: files || [], // Include file URLs
        });

        // Save the project to the database
        const savedProject = await newProject.save();
        console.log('Project saved successfully:', savedProject);
        res.status(201).json({ message: 'Project created successfully', project: savedProject });
    } catch (error) {
        console.error('Error in addProject:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};