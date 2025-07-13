import Project from '../models/Project.js';
import mongoose from 'mongoose';

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
    api_key: process.env.CLOUDINARY_API_KEY || 'demo',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
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


export const addProject = async (req, res) => {
    try {
        const { title, description, budget, deadline, requiredSkills, customSkills, client, category, experienceLevel } = req.body;

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
            experienceLevel
        });

        // Create a new project
        const newProject = new Project({
            title,
            description,
            budget: Number(budget),
            deadline: new Date(deadline),
            requiredSkills,
            customSkills: customSkills || [], // Default to empty array if not provided
            client,
            category,
            experienceLevel,
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


export const getProjectsByClientID = async (req, res) => {
    const clientId = req.params.id;
    try{
     
         const projects = await Project.find({ client: clientId });
         if (!projects || projects.length === 0) {
              return res.status(404).json({ message: 'No projects found for this client' });
         }
         res.status(200).json({ message: `Projects for client ID ${clientId} retrieved successfully`, projects });
    }catch (error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteProject = async (req, res) => {
    const projectId = req.params.id;
    try{
         const project = await Project.findByIdAndDelete(projectId);
         if (!project) {
              return res.status(404).json({ message: 'Project not found' });
         }
         res.status(200).json({ message: 'Project deleted successfully' });
    }catch (error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Helper function to get all clients (for testing)
export const getAllClients = async (req, res) => {
    try {
        const Client = mongoose.model('Client');
        const clients = await Client.find({}, '_id name email');
        console.log('Found clients:', clients);
        res.status(200).json({ clients });
    } catch (error) {
        console.error('Error getting clients:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Helper function to create a test client
export const createTestClient = async (req, res) => {
    try {
        const Client = mongoose.model('Client');
        const bcrypt = await import('bcryptjs');
        
        // Check if test client already exists
        const existingClient = await Client.findOne({ email: 'test@client.com' });
        if (existingClient) {
            return res.status(200).json({ 
                message: 'Test client already exists', 
                clientId: existingClient._id 
            });
        }

        // Create test client
        const salt = await bcrypt.default.genSalt(10);
        const hashedPassword = await bcrypt.default.hash('password123', salt);

        const testClient = new Client({
            name: 'Test Client',
            username: 'testclient',
            email: 'test@client.com',
            password: hashedPassword,
            company: 'Test Company',
            mobile: '1234567890',
            location: 'Test City'
        });

        await testClient.save();
        res.status(201).json({ 
            message: 'Test client created successfully', 
            clientId: testClient._id 
        });
    } catch (error) {
        console.error('Error creating test client:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



router.get('/client/proposals', async (req, res) => {
  try {
    const clientId = req.query.clientId; // Expect clientId from query
    if (!clientId) return res.status(400).json({ message: 'clientId is required' });
    const proposals = await Proposal.find({ clientId }).sort({ submittedAt: -1 });
    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proposals', error });
  }
});

router.put('/client/proposals/:id/accept', async (req, res) => {
  try {
    const clientId = req.body.clientId; // Expect clientId from body
    if (!clientId) return res.status(400).json({ message: 'clientId is required' });
    const proposal = await Proposal.findOneAndUpdate(
      { _id: req.params.id, clientId, status: 'pending' },
      { status: 'accepted' },
      { new: true }
    );
    if (!proposal) return res.status(404).json({ message: 'Proposal not found or already processed' });
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'Error accepting proposal', error });
  }
});

router.put('/client/proposals/:id/decline', async (req, res) => {
  try {
    const clientId = req.body.clientId; // Expect clientId from body
    if (!clientId) return res.status(400).json({ message: 'clientId is required' });
    const proposal = await Proposal.findOneAndUpdate(
      { _id: req.params.id, clientId, status: 'pending' },
      { status: 'declined' },
      { new: true }
    );
    if (!proposal) return res.status(404).json({ message: 'Proposal not found or already processed' });
    res.json(proposal);
  } catch (error) {
    res.status(500).json({ message: 'Error declining proposal', error });
  }
});

export default router;
