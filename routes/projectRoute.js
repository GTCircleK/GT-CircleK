let express = require('express'),
    Project = require('../models/project'),
    projectsData = require('../projects'),
    middleware = require('../middleware');

let router = express.Router();

router.get('/projects', (req, res) => {
    Project.find({}, (err, projects) => {
        if (err || !projects) {
            // If the database is down
            res.render('projects/allProjects', { projects: projectsData });
        }
        else {
            res.render('projects/allProjects', { projects: projects });
        }
    });
});

router.get('/projects/create', middleware.isLoggedIn, (req, res) => {
    res.render('projects/newProject');
});

router.get('/projects/:id', (req, res) => {
    var id = req.params.id;

    Project.findById(id, (err, item) => {
        if (err || !item) {
            // If the database is down
            let projectList = projectsData.filter(project => project['id'] == req.params.id);
            if (projectList.length > 0) {
                res.render('projects/project', { project: projectList[0] });
            }
            else {
                res.render('unavailable');
            }
        }
        else {
            res.render('projects/project', { project: item });
        }
    });
});

router.get('/projects/:id/edit', middleware.isLoggedIn, (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if (err || !project){
            req.flash('error', 'Failed to find the project. Please try again later or contact the admin');
            res.redirect('back');
        }
        else{
            res.render('projects/editProject', {project: project});
        }
    });
});

router.put('/projects/:id', middleware.isLoggedIn, (req, res) => {
    var project = req.body.project;
    
    // Remove any whitespaces
    for(var key in project){
        project[key] = project[key].trim();
    }

    Project.findByIdAndUpdate(req.params.id, project, (err, item) => {
        if (err || !item){
            req.flash('error','Failed to update the project. Please try again later');
            res.redirect('back');
        }
        else{
            req.flash('success', 'Successfully updated the project');
            res.redirect('/projects/' + item.id);
        }
    });
});

router.delete('/projects/:id', middleware.isAuthorized, (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err) => {
        if (err){
            req.flash('error', err.message);
            res.redirect('back');
        }
        else{
            req.flash('success', 'Successfully deleted the project');
            res.redirect('/projects');
        }
    });
});


router.post('/projects', middleware.isLoggedIn, (req, res) => {
    var project = req.body.project;
    for (var key in project){
        project[key] = project[key].trim();

        if (project[key].length == 0){
            delete project[key];
        }
    }
    
    Project.create(project, (err, newProject) => {
        if (err){
            req.flash('error', err.message + '. Please try again later. If the problem continues, contact admin');
            res.redirect('back');
        }        
        else{
            req.flash('success','Successfully created the project');
            res.redirect('/projects/' + newProject.id);
        }
    });     
});

router.get('/api/projects/', (req, res) => {
    Project.find({}, (err, projects) => {
        if (err){
            res.status(500).send(err.message);
        }
        else{
            var summary = [];
            projects.forEach(project => {
               summary.push({
                   _id: project.id,
                   title: project.title
               });
            });
            res.send(summary);
        }
    });
});

router.get('/api/projects/:id', (req, res) => {
    Project.findById(req.params.id, (err, item) => {
        if (err){
            res.status(500).send(err.message);
        }
        else if (!item){
            res.status(500).send('No project found for the given id');
        }
        else{
            res.send(item);
        }
    });
});


module.exports = router;