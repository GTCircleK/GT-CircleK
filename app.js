let express = require('express');

let app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Starting the connection to the server');
});