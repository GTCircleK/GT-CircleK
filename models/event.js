const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    'title': {type: String, required: true},
    'multiDay': Boolean,
    'from': {type: Date, required: true},
    'to': {type: Date, required: true},
    'description': String,
    'location': String,
    'address': String,
    'pickup': String,
    'dress': String,
    'link': String,
    'special': String,
    'google_event_id': String
});

module.exports = mongoose.model('Event', eventSchema);