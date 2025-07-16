
import express from 'express';
import multer from 'multer';
// Make sure the file exists at this path, or update the path if needed
import { uploadFiles } from '../config/utils.js';
import { addProject,getProjectsByClientID,deleteProject,profileData , profileUpdate,acceptProposal,declineProposal,getClientDashboard} from '../controllers/clientController.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // or your desired config

router.post('/addProject',addProject);
router.post('/upload', uploadFiles);
router.get('/getProjects/:id', getProjectsByClientID);
router.delete('/deleteProject/:id', deleteProject);
router.put('/projects/:projectId/applicants/:freelancerId/accept', acceptProposal);
router.put('/projects/:projectId/applicants/:freelancerId/decline', declineProposal);
router.get('/dashboard',getClientDashboard);
router.get('/profile/:id', profileData);
router.put('/profile/:id', profileUpdate);

export default router;
