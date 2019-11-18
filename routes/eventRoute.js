let express = require('express'),
    Event = require('../models/event');
let router = express.Router();

router.get('/events', (req, res) => {
    res.render('events');
});

// ------------------ API ------------------------
router.get('/data/upcomingEvents', (req, res) => {
    var currentDate = new Date().toISOString();
    Event.find({to: {$gte: currentDate}}, (err, events) => {
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

router.get('/data/allEvents', (req, res) => {
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


module.exports = router;