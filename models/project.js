var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    summary: {type: String, required: true},
    logo: {type: String, required: true},
    who: String,
    what: String,
    location: String,
    address: {type: String, required: true},
    time: String,    
    pickup: String,
    dress: String,
    link: String,
    extra: String,
    imagePath: String,
    images: [{type: String}],
    isActive: {type: Boolean, default: true}
});

module.exports = mongoose.model('Project', projectSchema);