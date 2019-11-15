var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: String,
    summary: String,
    logo: String,
    who: String,
    what: String,
    location: String,
    address: String,
    time: String,    
    pickup: String,
    dress: String,
    link: String,
    extra: String,
    imagePath: String,
    images: [{type: String}]
});

module.exports = mongoose.model('Project', projectSchema);