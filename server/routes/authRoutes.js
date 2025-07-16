import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { checkAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Always return a role property for both clients and freelancers
router.get('/check', checkAuth, (req, res) => {
    res.status(200).json({
        id: req.user._id,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role
    });
});


export default router;
