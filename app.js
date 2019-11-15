let express = require('express'),
    eventsData = require('./events'),
    projectsData = require('./projects'),
    bodyParser = require('body-parser'),
    Project = require('./models/project'),
    Event = require('./models/event'),
    Configuration = require('./configuration'),
    mongoose = require('mongoose');

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

// ------------------ Database setup --------------------------
mongoose.connect(Configuration.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



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
    Project.find({}, (err, projects) => {
        if (err) {
            res.render('allProjects', { projects: projectsData });
        }
        else {
            res.render('allProjects', { projects: projects });
        }
    });

});

app.get('/projects/:id', (req, res) => {
    var id = req.params.id;

    Project.findById(id, (err, item) => {
        if (err) {
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

app.get('/events', (req, res) => {
    res.render('events');
});

// ------------------ API ------------------------
app.get('/data/upcomingEvents', (req, res) => {
    var currentDate = new Date().toISOString();
    Event.find({to: {$gte: currentDate}}, (err, events) => {
        if (err) {
            res.send(503).send({
                message: 'Error retrieving documents from database'
            });
        }
        else {
            console.log(events);
            res.send(events);
        }
    });


});

app.get('/data/allEvents', (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            res.send(503).send({
                message: 'Error retrieving documents from database'
            });
        }
        else {
            res.send(events);
        }
    });
});


// ---------------- Admin Tools ------------------
app.get('/login', (req, res) => {
    res.render('admin/login')
});


// // ------------------ New Events handler ----------------
// app.get('/events/create', isUserAuthenticated, (req, res) => {
//     res.render('admin/newEvent');
// });

// app.post('/events',isUserAuthenticated, (req, res) => {
//     console.log(req.body.event);
//     res.send(req.body.event);

//     Event.save(req.body.event, (err, newEvent) => {
//         if (err){
//             res.redirect('/events/create');
//         }

//         res.redirect('events');
//     });
// });

// // ---------------------- New Project Handler --------------------------------
// app.get('/projects/create', isUserAuthenticated, (req, res) => {
//     res.render('admin/newProject');
// });

// app.post('/projects', isUserAuthenticated, (req, res) => {
//     var project = req.body.newProject;
//     Project.save(project, (err, newProject) => {
//         if (err){
//             res.redirect('projects/create');
//         }        
//         res.redirect('/projects/' + newProject._id);
//     });     
// });


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Starting the connection to the server');
});

