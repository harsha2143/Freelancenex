import Client from '../models/client.js';
import bcrypt from 'bcryptjs';
import Freelancer from '../models/freelancer.js';
import { generateToken } from '../config/utils.js';

const register = async (req, res) => {
    try {
        const { username, password, name, email, role } = req.body;
        if (!username || !password || !name || !email || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (role === 'client') {
            // Check if the user already exists
            const existingClient = await Client.findOne({ username });
            if (existingClient) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            // Check if the email already exists
            const existingEmail = await Client.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            // Create a new client  
            const newUser = new Client({ username, password: hashedPassword, name, email });
            if (newUser) {
                generateToken(newUser._id, res);
                await newUser.save();
                return res.status(201).json({
                    message: 'Client registered successfully',
                    id: newUser._id,
                    username: newUser.username,
                    name: newUser.name,
                    email: newUser.email
                });
            }
        } else if (role === 'freelancer') {
            // Check if the user already exists
            const existingFreelancer = await Freelancer.findOne({ username });
            if (existingFreelancer) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            // Check if the email already exists
            const existingEmail = await Freelancer.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            // Create a new freelancer
            const newUser = new Freelancer({ username, password: hashedPassword, name, email });
            if (newUser) {
                generateToken(newUser._id, res);
                await newUser.save();
                return res.status(201).json({
                    message: 'Freelancer registered successfully',
                    id: newUser._id,
                    username: newUser.username,
                    name: newUser.name,
                    email: newUser.email
                });
            }
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(req.body);

        if (!email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        let user; // ✅ declare outside the if blocks

        if (role === 'client') {
            user = await Client.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'Client not found' });
            }
        } else if (role === 'freelancer') {
            user = await Freelancer.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'Freelancer not found' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        generateToken(user._id, res);
        return res.status(200).json({
            message: 'User logged in successfully',
            id: user._id,
            email: user.email,
            role
        });
    } catch (error) {
        console.error("Error in Login Controller:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};


const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout Controller");
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export { register, login, logout };