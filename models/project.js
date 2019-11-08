var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: String,
    summary: String,
    logo: String,
    who: String,
    what: String,
    location: String,
    address: String,
    day: String,
    fromTime: Date,
    toTime: Date,    
    pickup: String,
    dress: String,
    link: String,
    extra: String,
    imagePath: String,
    images: [{type: String}]
});

moodule.exports = mongoose.model('Project', projectSchema);