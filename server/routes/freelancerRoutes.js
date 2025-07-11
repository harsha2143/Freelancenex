import { getallProjects, freelancerProjects, appliedProjects } from "../controllers/freelancerController.js";
import express from "express";
const router = express.Router();

router.get("/projects", getallProjects);
router.get("/projects/applied/:id", appliedProjects);
router.get("/projects/:id", freelancerProjects);

export default router;
