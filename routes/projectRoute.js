let express = require('express'),
    Project = require('../models/project'),
    projectsData = require('../projects');
let router = express.Router();

router.get('/projects', (req, res) => {
    Project.find({}, (err, projects) => {
        if (err || !projects) {
            // If the database is down
            res.render('allProjects', { projects: projectsData });
        }
        else {
            res.render('allProjects', { projects: projects });
        }
    });

});

router.get('/projects/:id', (req, res) => {
    var id = req.params.id;

    Project.findById(id, (err, item) => {
        if (err || !item) {
            // If the database is down
            let projectList = projectsData.filter(project => project['id'] == req.params.id);
            if (projectList.length > 0) {
                res.render('project', { project: projectList[0] });
            }
            else {
                res.render('unavailable');
            }
        }
        else {
            res.render('project', { project: item });
        }
    });
});

// ---------------------- New Project Handler --------------------------------
// router.get('/projects/create', isUserAuthenticated, (req, res) => {
//     res.render('admin/newProject');
// });

// router.post('/projects', isUserAuthenticated, (req, res) => {
//     var project = req.body.newProject;
//     Project.save(project, (err, newProject) => {
//         if (err){
//             res.redirect('projects/create');
//         }        
//         res.redirect('/projects/' + newProject._id);
//     });     
// });


module.exports = router;