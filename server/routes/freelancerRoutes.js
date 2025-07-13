import { getallProjects, freelancerProjects, getApplications, getActiveProjects } from "../controllers/freelancerController.js";
import express from "express";
const router = express.Router();

router.get("/projects", getallProjects);
router.get("/applications/:id", getApplications);
router.get("/projects/:id", freelancerProjects);
router.get("/active-projects/:id", getActiveProjects);

// Add a test route to debug
router.get("/test/:id", (req, res) => {
    console.log('Test route hit with ID:', req.params.id);
    res.json({ message: 'Test route working', id: req.params.id });
});

export default router;
