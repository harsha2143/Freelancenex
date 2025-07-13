
import Project from '../models/Project.js';
export const addProject = (req, res) => {
   try{
         const { title, description, budget, deadline, requiredSkills, client ,applicants} = req.body;
    
         // Validate required fields
         if (!title || !description || !budget || !deadline || !requiredSkills || !client) {
              return res.status(400).json({ message: 'All fields are required' });
         }
    
         // Create a new project
         const newProject = new Project({
              title,
              description,
              budget,
              deadline,
              requiredSkills,
              client,
              applicants: applicants || [], // Initialize with an empty array if no applicants are provided
         });
    
         // Save the project to the database
         newProject.save()
              .then(project => res.status(201).json({ message: 'Project created successfully', project }))
              .catch(err => res.status(500).json({ message: 'Error creating project', error: err.message }));
   }catch (error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export const getProjectsByClientID = async (req, res) => {
    const clientId = req.params.id;
    try{
         const projects = await Project.find({ client: clientId });
         if (!projects || projects.length === 0) {
              return res.status(404).json({ message: 'No projects found for this client' });
         }
         res.status(200).json({ message: `Projects for client ID ${clientId} retrieved successfully`, projects });
    }catch (error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteProject = async (req, res) => {
    const projectId = req.params.id;
    try{
         const project = await Project.findByIdAndDelete(projectId);
         if (!project) {
              return res.status(404).json({ message: 'Project not found' });
         }
         res.status(200).json({ message: 'Project deleted successfully' });
    }catch (error) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
}
