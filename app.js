require('dotenv').config();

let express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

    
// <<<<<<<<<<<<<< Database setup >>>>>>>>>>>>>>>>>
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Connected to the database')).catch((err) => console.log(err));


// <<<<<<<<<< Express Configuration >>>>>>>>>>>>>>>
let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(methodOverride('_method'));


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

