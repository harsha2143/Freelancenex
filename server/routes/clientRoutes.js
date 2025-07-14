// routes/clientRoutes.js
import express from 'express';
import { addProject, getProjectsByClientID, deleteProject, profileData, profileUpdate, acceptProposal, declineProposal } from '../controllers/clientController.js';
const router = express.Router();

router.post('/addProject', addProject);
router.get('/getProjects/:id', getProjectsByClientID);
router.delete('/deleteProject/:id', deleteProject);
router.get('/profile/:id', profileData);
router.put('/profile/:id', profileUpdate);
router.put('/projects/:projectId/applicants/:freelancerId/accept', acceptProposal);
router.put('/projects/:projectId/applicants/:freelancerId/decline', declineProposal);

export default router;