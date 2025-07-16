import Project from "../models/Project.js";
import Freelancer from "../models/freelancer.js";
import mongoose from "mongoose";
import Freelancer from "../models/freelancer.js";

export const getallProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isActive: true });
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }
        res.status(200).json({ message: 'Projects retrieved successfully', projects });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const freelancerProjects = async (req, res) => {
    try {
        const freelancerId = req.params.id;
        const projects = await Project.find({ Freelancer: freelancerId, isActive: true });
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for this freelancer' });
        }
        res.status(200).json({ message: 'Freelancer projects retrieved successfully', projects });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getApplications = async (req, res) => {
    try {
        const freelancerId = req.params.id;
        // console.log('Fetching applications for freelancer ID:', freelancerId);
        // console.log('Request params:', req.params);
        // console.log('Request headers:', req.headers);
        
        // Validate freelancerId
        if (!freelancerId) {
            console.log('Missing freelancer ID');
            return res.status(400).json({ message: 'Missing freelancer ID' });
        }
        
        if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
            console.log('Invalid ObjectId format:', freelancerId);
            return res.status(400).json({ message: 'Invalid ObjectId format' });
        }
        
        // console.log('About to query database...');
        
        // First, let's test if we can find any projects at all
        const allProjects = await Project.find({});
        // console.log('Total projects in database:', allProjects.length);
        
        // Find projects where the freelancer has applied but is not assigned as the current Freelancer
        const projects = await Project.find({
            applicants: { $in: [new mongoose.Types.ObjectId(freelancerId)] },
            isActive: true,
            $or: [
                { Freelancer: { $exists: false } },
                { Freelancer: null },
                { Freelancer: { $ne: freelancerId } }
            ]
        }).populate('client', 'name email company location');
        
        // console.log('Database query completed');
        
        // console.log('Found projects:', projects.length);
        
        // Return empty array if no projects found (instead of 404)
        if (!projects || projects.length === 0) {
            return res.status(200).json({ 
                message: 'No applied projects found for this freelancer', 
                applications: [] 
            });
        }

        // Transform the data to match frontend expectations
        const applications = projects.map(project => ({
            id: project._id,
            projectTitle: project.title,
            client: {
                name: project.client?.name || 'Unknown Client',
                rating: 4.5, // Default rating since it's not in the model
            },
            status: 'pending', // Default status since it's not in the model
            shortlisted: false, // Default value
            budget: project.budget,
            budgetType: project.budgetType,
            deadline: project.deadline,
            category: project.category,
            experienceLevel: project.experienceLevel,
            createdAt: project.createdAt,
            // Add missing fields that the frontend expects
            coverLetter: 'Your application has been submitted successfully.',
            proposedBudget: project.budget,
            submittedAt: project.createdAt,
            views: Math.floor(Math.random() * 10) + 1, // Random views for demo
            timeline: '1-2 weeks', // Default timeline
            acceptedAt: null,
            declinedAt: null,
            declineReason: null
        }));

        // console.log('Transformed applications:', applications.length);
        res.status(200).json({ message: 'Applied projects retrieved successfully', applications });
    } catch (error) {
        console.error('Error in getApplications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getActiveProjects = async (req, res) => {
    try {
        const freelancerId = req.params.id;
        console.log('Fetching active projects for freelancer:', freelancerId);

        // Check if freelancer exists
        const freelancer = await Freelancer.findById(freelancerId);
        if (!freelancer) {
            console.log('Freelancer not found:', freelancerId);
            return res.status(404).json({ message: 'Freelancer not found' });
        }
        // console.log('Freelancer found:', freelancer.name);

        // Fetch projects assigned to the freelancer with active status
        const projects = await Project.find({
            Freelancer: freelancerId,
            status: { $in: ['Active', 'Pending'] } // Only active and pending projects
        }).populate('client', 'name email company location')
          .populate('Freelancer', 'name email skills')
          .sort({ createdAt: -1 });

        // console.log('Found projects:', projects.length);

        if (!projects || projects.length === 0) {
            return res.status(200).json({ 
                message: 'No active projects found for this freelancer', 
                projects: [] 
            });
        }

        res.status(200).json({ 
            message: 'Active projects retrieved successfully', 
            projects 
        });
    } catch (error) {
        console.error('Error in getActiveProjects:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const profileData = async (req, res) => {
    try {
        const freelancerId = req.params.id; 
        const freelancer = await Freelancer.findById(freelancerId).select('-password -__v'); 

        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer profile not found' });
        }
        console.log(freelancer);

        res.status(200).json({ message: 'Freelancer profile retrieved successfully', freelancer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const profileUpdate = async (req, res) => {
    try {
        const freelancerId = req.params.id;
        const updateData = req.body;

        const updatedFreelancer = await Freelancer.findByIdAndUpdate(freelancerId, updateData, { new: true, runValidators: true });

        if (!updatedFreelancer) {
            return res.status(404).json({ message: 'Freelancer profile not found' });
        }

        res.status(200).json({ message: 'Freelancer profile updated successfully', freelancer: updatedFreelancer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}