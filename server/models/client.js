import mongoose from "mongoose";


const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    username: {
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
    company: {
        type: String,
        // required: true,
    },
    mobile: {
        type: String,
        // required: true,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    location: {
        type: String,
        // required: true,
    },
    role: {
        type: String,
        default: 'client',
        enum: ['client'],
    },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
