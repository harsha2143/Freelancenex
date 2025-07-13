import Project from "../models/Project.js";
import mongoose from "mongoose";

export const getallProjects = async (req, res) => {
    try {
        const projects = await Project.find();
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

export const appliedProjects = async (req, res) => {
    try {
        const freelancerId = req.params.id;
        
        const projects = await Project.find({
            applicants: { $in: [new mongoose.Types.ObjectId(freelancerId)] },
            isActive: true
        });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No applied projects found for this freelancer' });
        }

        res.status(200).json({ message: 'Applied projects retrieved successfully', projects });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
