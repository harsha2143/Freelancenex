import Project from "../models/Project.js";
import mongoose from "mongoose";
import Freelancer from "../models/freelancer.js";

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