require('dotenv').config();

let express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    flash = require('connect-flash');


// <<<<<<<<<<<<<< Database setup >>>>>>>>>>>>>>>>>
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(console.log('Connected to the database')).catch((err) => console.log(err));


// <<<<<<<<<< Express Configuration >>>>>>>>>>>>>>>
let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(flash());


// <<<<<<<<<< Passport Configuration >>>>>>>>>>>>>>>
app.use(require('express-session')({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errorMessage = req.flash('error');
	res.locals.successMessage = req.flash('success');
    next();
});

// <<<<<<<<<<<< Import Routes >>>>>>>>>>>>>>>>>>
var basicRoutes = require('./routes/index'),
    eventRoutes = require('./routes/eventRoute'),
    projectRoutes = require('./routes/projectRoute'),
    adminRoutes = require('./routes/adminRoute');

app.use(basicRoutes);
app.use(eventRoutes);
app.use(projectRoutes);
app.use(adminRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Starting the connection to the server');
});



