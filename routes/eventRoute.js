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
            res.render('events/editEvent', { event: item });
        }
    });
});

router.put('/events/:id', middleware.isLoggedIn, (req, res) => {
    
    var event = req.body.event;
    for (var key in event) {
        event[key] = event[key].trim();
    }

    console.log(event);

    Event.findByIdAndUpdate(req.params.id, event, { new: true }, (err, newEvent) => {
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
            try {
                // googleCalendarAPI.updateEvent(newEvent);
            }
            catch (e) {
                req.flash('error', 'Failed to update event in Google Calendar');
            }
            finally {
                res.redirect('/events');
            }
        }
    });
});

router.post('/events', middleware.isLoggedIn, (req, res) => {
    var event = req.body.event;
    for (var key in event) {
        event[key] = event[key].trim();
    }

    Event.create(event, (err, doc) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        }
        else {
            req.flash('success', 'Successfully created the event');
            try {
                // googleCalendarAPI.createEvent(doc);
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
        if (err) {
            res.flash('error', err.message);
            res.redirect('back');
        } else if (!item) {
            res.status(404).send('No event found for the given id');
        } else {
            try {
                // googleCalendarAPI.deleteEvent(item);
            }
            catch (e) {
                req.flash('error', 'Failed to delete event from Google calendar');
            }
            finally {
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

/*
    When deployed under the standard environment in GCP,
    the code parses the date as in UTC, even if the user is in EST.
    
    First get the timezone offset to check where the server is running.
    Convert the date to have the equivalent UTC date value.
    Then offset the time to match the EST.
*/
function fixDateForTimezone(time) {
    let utc_time = new Date(time);

    let custom_timezone_offset = Number.parseInt(process.env.TIMEZONE_OFFSET);

    // First check where the current timezone is 
    let currentOffset = utc_time.getTimezoneOffset() / 60;

    console.log(`Custom offset - ${custom_timezone_offset}`);
    console.log(`Current offset - ${currentOffset}`);
    
    if (currentOffset == custom_timezone_offset) {
        // The server location is in EST. No modification required.
        return utc_time.toISOString();

    } else if (currentOffset == 0) {
        // The server location is in UTC
        utc_time.setHours(utc_time.getHours() + timezone_offset);

    } else {
        // The server location is not in UTC or EST.
        // First convert the time in UTC
        utc_time.setHours
        utc_time.setTime(utc_time.getTime() + currentOffset * 60 * 1000);        

        // Offset from UTC to Eastern Time
        utc_time.setTime(utc_time.getTime() + custom_timezone_offset * 60 * 1000);
    }
    
    console.log(`Formatted Date - ${utc_time.too}`)
    return utc_time.toISOString();
}

module.exports = router;