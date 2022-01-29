//DEPENDENCIES

const express = require ('express');

const cors = require ('cors');

const morgan = require ('morgan')

const app = express();

const mongoose = require('mongoose');

const { PORT = 4000 } = process.env;

const session = require('express-session');

require('dotenv').config();

//DB connection

mongoose.connect(process.env.DATABASE_URL);

//DB connection error/success

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message +'Is mongodb not running?'));
db.on('connected', () => console.log('Connected!'));
db.on('disconnected', () => console.log('MongoDB is disconnected'));


// IMPORT JSON FILES
const Abilities = require('./CSV/Abilities.json');
const Datasheets_abilities = require('./CSV/Datasheets_abilities.json');
const Datasheets_damage = require('./CSV/Datasheets_damage.json');
const Datasheets_keywords = require('./CSV/Datasheets_keywords.json');
const Datasheets_models = require('./CSV/Datasheets_models.json');
const Datasheets = require('./CSV/Datasheets');
const Factions = require('./CSV/Factions');




//Middleware

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

//Routes 

const routesController = require ('./controllers/controllers.js');

const userController = require ('./controllers/users');

const sessionsController = require('./controllers/sessions');

app.use('/', routesController);

app.use('/users', userController);

app.use('/sessions', sessionsController);


// ROUTE FOR RETRIEVING ABILITIES INFO
app.get('/Abilities', (req, res) => {
    res.json(Abilities);
});

// ROUTE FOR RETRIEVING DATASHEETS_ABILITIES
app.get('/DatasheetsAbilities', (req, res) => {
    res.json(Datasheets_abilities);
});

// ROUTE FOR RETRIEVING DATASHEETS_DAMAGE
app.get('/DatasheetsDamage', (req, res) => {
    res.json(Datasheets_damage);
});

// ROUTE FOR RETRIEVING DATASHEETS_KEYWORDS
app.get('/DatasheetsKeywords', (req, res) => {
    res.json(Datasheets_keywords);
});

// ROUTE FOR RETRIEVING DATASHEETS_MODELS
app.get('/DatasheetsModels', (req, res) => {
    res.json(Datasheets_models);
});

// ROUTE FOR RETRIEVING DATASHEETS
app.get('/Datasheets', (req, res) => {
    res.json(Datasheets);
});

// ROUTE FOR RETRIEVING FACTIONS
app.get('/Factions', (req, res) => {
    res.json(Factions);
});












//listen for PORT

app.listen(PORT, () => console.log(`Listening on ${PORT}`))











