// REQUIRE dotenv file
require('dotenv').config();

// CONSTANTS TO REQUIRE FROM EXTERNAL FILES
const   
    express = require('express'),
    app = express(),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    // flash = require('connect-flash'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    usersRoutes = require('./routes/users.js'),
    projectsRoutes = require('./routes/projects.js'),
    MONGODB_URI = process.env.MONGODB_URI,
    PORT = process.env.PORT || 4001;

// CONNECT TO MONGOOSE
mongoose.connect(MONGODB_URI, { useNewUrlParser: true}, (err) => {
    console.log(err || `Connected to mLab`)
})

// CONFIGURATIONS

// MIDDLEWARE
app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(flash());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));

// SERVE UP STATIC ASSETS (FOR HEROKU)

// ROUTES
app.get('/api', (req, res) => {
    res.json({ message: "API ROOT" })
});
// Require usersRouter
const usersRouter = require('/.routers/users');
app.use('/api/users', usersRouter);
// Require projectsRouter
const projectsRouter = require('./routers/projects');
app.use('/api/users/:id/projects', projectsRouter);

// 404 Error/route:
app.get("*", (req, res) => {
    res.sendStatus(404);
});

// LISTENING PORT
app.listen(PORT, err => {
    console.log(err || `Server listening on PORT ${PORT}`);
});