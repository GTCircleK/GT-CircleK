let express = require('express'),
    eventsData = require('./events'),
    projectsData = require('./projects');

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ------------------ Website Endpoints ------------------------
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
    if (projectList.length > 0){
        res.render('project', {project: projectList[0]});
    }
    else{
        res.render('unavailable');
    }
    
});

app.get('/events', (req, res) => {
    res.render('events');
});



// ------------------ API ------------------------
app.get('/data/upcomingEvents', (req, res) => {    
    //verify the events have not ended    
    var allEvents = eventsData['events'];
    allEvents = allEvents.filter(event => !eventHasEnded(event['to']));

    res.send({events: allEvents});
});

function eventHasEnded(compareDate){
    return (new Date(compareDate)) < (new Date());
}

app.get('/data/allEvents', (req, res) => {
    res.status(404).send('No a valid endpoint');
});


app.get('*', (req, res) => {
    res.render('unavailable');
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Starting the connection to the server');
});