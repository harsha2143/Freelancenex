
import { getallProjects, freelancerProjects, getApplications, getActiveProjects,profileData,profileUpdate } from "../controllers/freelancerController.js";

import express from "express";
const router = express.Router();

router.get("/projects", getallProjects);
router.get("/applications/:id", getApplications);
router.get("/projects/:id", freelancerProjects);
router.get("/active-projects/:id", getActiveProjects);


router.get("/profile/:id", profileData);
router.put("/profile/:id", profileUpdate); // Assuming you want to update profile data as well
export default router;
