let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/resources', (req, res) => {
    res.render('resources');
});

router.get('/join', (req, res) => {
    res.render('join');
});

router.get('/privacy', (req, res) => {
    res.render('privacy');
});

router.get('/terms', (req, res) => {
    res.render('terms');
});

module.exports = router;