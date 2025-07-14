import mongoose from "mongoose";


const freelancerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        // required: true,
    },
    skills: [{
        type: String,
        enum:['JavaScript','UI/UX','Python', 'Java', 'C++', 'Ruby', 'PHP', 'HTML/CSS', 'React', 'Node.js', 'Django', 'Flask', 'Angular', 'Vue.js'],
        // required: true,
    }],
    portfolio: {
        type: String,
        // required: true,
    },
    resume:{
        type: String,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    projects:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        }],
        default: [],
    }
});

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

export default Freelancer;