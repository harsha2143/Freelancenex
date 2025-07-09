import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    requiredSkills: [{
        type: String,
        enum:['JavaScript','UI/UX','Python', 'Java', 'C++', 'Ruby', 'PHP', 'HTML/CSS', 'React', 'Node.js', 'Django', 'Flask', 'Angular', 'Vue.js'],
        required: true,
    }],
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    Freelancer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
       
        unique: true, // Ensure unique freelancer for each project
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        unique: true, // Ensure unique applicants
    }],
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed', 'cancelled'],
        default: 'open',
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    files:{
        type: [String], // Array of file URLs or paths
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;

