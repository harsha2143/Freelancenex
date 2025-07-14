// routes/clientRoutes.js
import express from 'express';
import { addProject, getProjectsByClientID, deleteProject, profileData, profileUpdate, acceptProposal, declineProposal } from '../controllers/clientController.js';
import multer from 'multer';
// Make sure the file exists at this path, or update the path if needed
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // or your desired config

router.post('/addProject', addProject);
router.get('/getProjects/:id', getProjectsByClientID);
router.delete('/deleteProject/:id', deleteProject);
router.post('/addProject',addProject);
router.post('/upload', uploadFiles);
router.get('/getProjects/:id', getProjectsByClientID);
router.delete('/deleteProject/:id', deleteProject);
router.get('/getAllClients', getAllClients); // For testing
router.post('/createTestClient', createTestClient); // For testing

router.get('/profile/:id', profileData);
router.put('/profile/:id', profileUpdate);
router.put('/projects/:projectId/applicants/:freelancerId/accept', acceptProposal);
router.put('/projects/:projectId/applicants/:freelancerId/decline', declineProposal);

export default router;