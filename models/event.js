const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    'title': {type: String, required: true},
    'multiDay': Boolean,
    'from': {type: String, required: true},
    'to': {type: String, required: true},
    'description': String,
    'location': String,
    'address': String,
    'pickup': String,
    'dress': String,
    'link': String,
    'special': String
});

module.exports = mongoose.model('Event', eventSchema);