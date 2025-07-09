import express from 'express';
const port = 3000;
const app = express();
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/auth/',authRoutes);
app.use('/api/client', clientRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
