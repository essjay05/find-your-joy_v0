// Require constants
const
    express = require('express'),
    usersRouter = new express.Router(),
    usersCtrl = require('../controllers/users.js');
    // projectsCtrl = require('../controllers/projects.js'),
    // verifyToken = require('../serverAuth').verifyToken;

// USERS CRUD Routes
// Non-protected Routes
    // Create
    usersRouter.post('/', usersCtrl.create);
    // Index
    usersRouter.get('/', usersCtrl.index);
    // Authenticate
    usersRouter.post('/authenticate', usersCtrl.authenticate);
    // Verify Token
    usersRouter.use(verifyToken);
    // Protected Users Routes
        // Show1
        usersRouter.get('/:id', usersCtrl.show);
        // Edit/Update
        usersRouter.patch('/:id', usersCtrl.update);
        // Delete
        usersRouter.delete('/:id', usersCtrl.destroy);
        
        // PROJECTS CRUD Routes
            // Create Project
            usersRouter.post('/:id/projects', projectsCtrl.create);
            // Index: Show all projects
            usersRouter.get('/:id/projects', projectsCtrl.index);
            // Update Project
            usersRouter.patch('/:id/projects/:proj_id', projectsCtrl.update);
            // Delete Project
            usersRouter.delete('/:id/projects/:proj_id', projectsCtrl.destroy);

// Export module
module.exports = usersRouter;