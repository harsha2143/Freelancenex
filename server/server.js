import express from 'express';
const port = 3000;
const app = express();
import connectDB from './config/db.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
