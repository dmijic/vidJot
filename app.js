const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Connect to db
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useMongoClient: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Load Idea Model
require('./models/idea');
const Idea = mongoose.model('ideas');

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title
    })
});

// About route
app.get('/about', (req, res) => {
    res.render('about')
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});