
import express from 'express';
import multer from 'multer';
// Make sure the file exists at this path, or update the path if needed
import { addProject,getProjectsByClientID,deleteProject,getAllClients,createTestClient,uploadFiles  ,profileData , profileUpdate } from '../controllers/clientController.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // or your desired config

router.post('/addProject',addProject);
router.post('/upload', uploadFiles);
router.get('/getProjects/:id', getProjectsByClientID);
router.delete('/deleteProject/:id', deleteProject);
router.get('/getAllClients', getAllClients); // For testing
router.post('/createTestClient', createTestClient); // For testing

router.get('/profile/:id', profileData);
router.put('/profile/:id', profileUpdate);

export default router;
