import express from 'express';
import cors from 'cors';
const port = 3000;
const app = express();
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import freelancerRoutes from './routes/freelancerRoutes.js';

// CORS configuration


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true
}));
connectDB();

app.use('/api/auth',authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/freelancer', freelancerRoutes);





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
