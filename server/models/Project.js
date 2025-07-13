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
    budgetType: {
        type: String,
        default: 'Fixed', // 'Hourly' or 'Fixed'
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
        required: true,
    },
    requiredSkills: [{
        type: String,
        enum: ['JavaScript', 'UI/UX', 'Python', 'Java', 'C++', 'Ruby', 'PHP', 'HTML/CSS', 'React', 'Node.js', 'Django', 'Flask', 'Angular', 'Vue.js', 'other'],
        required: true,
    }],
    customSkills: [{
        type: String,
    }],
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    Freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
        default: null
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Freelancer',
    }],
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Completed', 'cancelled'],
        default: 'Pending'
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    files: {
        type: [String], // Array of file URLs or paths
        default: [],
    },
    progress: {
        type: Number,
        default: 0, // 0 to 100
    },
    earned: {
        type: Number,
        default: 0, // Amount earned by freelancer so far
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    },
    completedAt: { type: Date },
    category: {
        type: String,
        enum: ['Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science', 'Content Writing', 'Digital Marketing', 'Other'],
        required: true,
    },
    experienceLevel: {
        type: String,
        enum: ['Entry Level', 'Intermediate', 'Expert'],
        required: true,
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