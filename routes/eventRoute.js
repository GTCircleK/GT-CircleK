let express = require('express'),
    Event = require('../models/event'),
    middleware = require('../middleware'),
    googleCalendarAPI = require('../googleAPI/calendar'),
    moment = require('moment');

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
            let from = moment(item['from']).format("YYYY-MM-DDTHH:mm");
            let to = moment(item['to']).format("YYYY-MM-DDTHH:mm");
            
            // For some reason, it was not overriding the values in the item object,
            // So passed from and to manually
            res.render('events/editEvent', { event: item, from: from, to: to });
        }
    });
});

router.put('/events/:id', middleware.isLoggedIn, (req, res) => {
    var event = req.body.event;
    for (var key in event) {
        event[key] = event[key].trim();
    }

    Event.findByIdAndUpdate(req.params.id, event, {new: true}, (err, newEvent) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else if (!newEvent) {
            req.flash('error', 'Could not find the event. Please try again later.');
            res.redirect('back');
        }
        else {
            req.flash('success', 'Sucessfully updated the event');
            try{
                googleCalendarAPI.updateEvent(newEvent);
            }
            catch(e){
                req.flash('error', 'Failed to update event in Google Calendar');
            }
            finally{
                res.redirect('/events');
            }
            
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

    newEvent['from'] = new Date(newEvent.from);
    newEvent['to'] = new Date(newEvent.to);
    console.log(newEvent)

    Event.create(newEvent, (err, doc) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else {
            req.flash('success', 'Successfully created the event');
            try {
                googleCalendarAPI.createEvent(doc);
            }
            catch (e) {
                req.flash('error', 'Failed to add event to Google Calendar');
            }
            finally {
                res.redirect('/events');
            }
        }
    });


});


router.delete('/events/:id', middleware.isAuthorized, (req, res) => {
    // Instead of deleting directly, first retrieve Google Event Id for the event to delete from Google Calendar
    // Then delete the retrieved event.
    Event.findById(req.params.id, (err, item) => {
        if (err){
            res.flash('error', err.message);
            res.redirect('back');
        } else if (!item){
            res.status(404).send('No event found for the given id');
        } else {
            try{                
                googleCalendarAPI.deleteEvent(item);
            } 
            catch(e){
                req.flash('error', 'Failed to delete event from Google calendar');
            }
            finally{
                item.remove();
                req.flash('success', 'Successfully deleted the event');
                res.redirect('/events');
            }            
        }
    });
});


// ------------------ API ------------------------
router.get('/api/upcomingEvents', (req, res) => {
    var currentDate = new Date().toISOString();
    Event.find({ to: { $gte: currentDate } }).sort('from').exec((err, events) => {
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