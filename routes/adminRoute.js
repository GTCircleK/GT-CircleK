let express = require('express'),
    passport = require('passport'),
    User = require('../models/user'),
    middleware = require('../middleware');

let Project = require('../models/project'),
    Event = require('../models/event');

let router = express.Router();


router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('success', 'You are already logged in');
        res.redirect('/dashboard');
    }
    else {
        res.render('admin/login');
    }
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {

    });

router.get('/dashboard', middleware.isLoggedIn, (req, res) => {
    res.render('admin/semantic-dashboard');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;