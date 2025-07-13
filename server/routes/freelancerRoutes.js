import { getallProjects, freelancerProjects, appliedProjects ,profileData ,profileUpdate} from "../controllers/freelancerController.js";
import express from "express";
const router = express.Router();

router.get("/projects", getallProjects);
router.get("/projects/applied/:id", appliedProjects);
router.get("/projects/:id", freelancerProjects);

router.get("/profile/:id", profileData);
router.put("/profile/:id", profileUpdate); // Assuming you want to update profile data as well
export default router;
