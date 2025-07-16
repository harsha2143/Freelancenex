import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const port = 3000;
const app = express();
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import freelancerRoutes from './routes/freelancerRoutes.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/freelancer', freelancerRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
