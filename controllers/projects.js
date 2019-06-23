// Require constants
const
    User = require('../models/User'),
    Project = require('../models/Project');

// Export controls
module.exports = {
    // Create Project COMPLETED
    create: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) { res.json({ success: false, err })}
            console.log(user)
            user.projects.push.(req.body)
            user.save(err => {
                if (err) res.json({ success: false, err })
                res.json({ success: true, user})
            })
        })
    },
    // Index all projects
    index: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err) { res.json({ success: false, err })}
            else {
                let projects = user.projects
                res.json({ success: true, projects })
            }
        })
    },
    // Show 1 project
    show: (req, res, next) => {
        let { id, proj_id } = req.params;
        User.findById(id, (err, user) => {
            if (err) { res.json({ success: false, err })}
            else {
                let project = user.projects.id(proj_id)
                Object.assign(project, req.body)
                project = { ...project, ...req.body }
                console.log(project)
                return user.save(err => {
                    if (err) res.json({ success: false, err })
                    res.json({ success: true, project })
                })
            }
        })
    },
    // Update project
    update: (rea, res) => {
        let { id, proj_id } = req.params;
        User.findById(id, (err, user) => {
            if (err) {res.json({ success: false, err })}
            else {
                let project = user.projects.id(proj_id)
                Object.assign(project, req.body)
                // project = { ...project, ...req.body }
                console.log(project)
                return user.save(err => {
                    if (err) res.json({ success: false, err })
                    res.json({ success: true, project})
                })
            }
        })
    },
    // Destroy project
    destroy: (req, res) => {
        let { id, proj_id } = req.params;
        User.findById(id, (err, user) => {
            if (err) {res.json({ success: false, err })}
            else {
                // user.projects.id(p)
                let projIndex = user.projects.indexOf(proj_id)
                console.log(projIndex)
                user.projects.splice(projIndex, 1)
                user.save(err => {
                    if (err) res.json({ success: false, err })
                    res.json({ success: true, message: 'Project has been deleted.'})
                })
                // let project = user.resume.projects.id(proj_id);
                // project.remove();
                // return user.save();
            }
        })
    }
}