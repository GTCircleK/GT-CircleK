const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    'title': String,
    'multiDay': Boolean,
    'from': Date,
    'to': Date,
    'description': String,
    'address': String,
    'pickup': String,
    'dress': String,
    'link': String,
    'special': String
});

module.exports = mongoose.model('Event', eventSchema);