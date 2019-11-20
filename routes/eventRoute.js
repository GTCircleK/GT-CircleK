let express = require('express'),
    Event = require('../models/event'),
    middleware = require('../middleware');
let router = express.Router();
let eventData = require('../events');

router.get('/events', (req, res) => {
    res.render('events/basicEvents');
});


router.get('/events/create', middleware.isLoggedIn, (req, res) => {
    res.render('events/newEvent');
});

router.get('/events/:id/edit', middleware.isLoggedIn, (req, res) => {
    Event.findById(req.params.id, (err, item) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else if (!item) {
            req.flash('error', 'Event could not be found. Please try again later');
            res.redirect('back');
        }
        else {
            res.render('events/editEvent', { event: item });
        }
    });
});

router.post('/events', middleware.isLoggedIn, (req, res) => {
    let newEvent = req.body.event;
    if (newEvent.multiday) {
        newEvent.multiday = true;
    } else {
        newEvent.multiday = false;
    }
    
    Event.create(newEvent, (err, newEvent) => {
        if (err){
            req.flash('error', err.message);
            res.redirect('back');
        }
        else{
            req.flash('success','Successfully created the event')
            res.redirect('/events');
        }
    });
});

router.put('events/:id', middleware.isLoggedIn, (req, res) => {
    var event = req.body.event;
    for (var key in event) {
        event[key] = event[key].trim();
    }

    Event.findByIdAndUpdate(req.params.id, event, (err, newEvent) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else if (!newEvent){
            req.flash('error', 'Could not find the event. Please try again later.');
            res.redirect('back');
        }
        else {
            req.flash('Sucessfully updated the event');
            res.redirect('/events');
        }
    });
});

router.delete('/events/:id', middleware.isAuthorized, (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else {
            req.flash('success', 'Successfully deleted the event');
            res.redirect('/events');
        }
    });
});


// ------------------ API ------------------------
router.get('/api/upcomingEvents', (req, res) => {
    var currentDate = new Date().toISOString();
    Event.find({ to: { $gte: currentDate } }, (err, events) => {
        if (err) {
            res.status(500).send({
                message: 'Error retrieving documents from database.\r\n' + err.message
            });
        }
        else {
            res.send(events);
        }
    });
});

router.get('/api/events', (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        else {
            res.send(events);
        }
    });
});

router.get('/api/events/:id', (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else if (!event) {
            res.status(500).send({
                message: 'No events found. Verify the event id'
            });
        } else {
            res.send(event);
        }
    });
});


module.exports = router;