
import express from 'express';
// Make sure the file exists at this path, or update the path if needed
import { addProject,getProjectsByClientID,deleteProject } from '../controllers/clientController.js';
const router = express.Router();

router.post('/addProject',addProject);
router.get('/getProjects/:id', getProjectsByClientID);
router.delete('/deleteProject/:id', deleteProject);

export default router;
