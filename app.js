let express = require('express'),
    events = require('./events'),
    projectsData = require('./projects');

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/resources', (req, res) => {
    res.render('resources');
});

app.get('/join', (req, res) => {
    res.render('join');
});

app.get('/projects', (req, res) => {
    res.render('allProjects', {projects: projectsData});
});

app.get('/projects/:id', (req, res) => {
    // TODO - add record to database and retrive from there
    let projectList = projectsData.filter(project => project['id'] == req.params.id);    
    res.render('project', {project: projectList[0]});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Starting the connection to the server');
});