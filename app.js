const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Load routes
const ideas = require('./routes/ideas');

// Map global promise
mongoose.Promise = global.Promise;
// Connect to db
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useMongoClient: true
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));



// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(flash());

// GLobal variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

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



// User login route
app.get('/users/login', (req, res) => {
    res.render('login')
});

// User register route
app.get('/users/register', (req, res) => {
    res.render('register')
});

// Use routes
app.use('/ideas', ideas);

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});