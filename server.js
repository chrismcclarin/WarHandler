//DEPENDENCIES

const express = require ('express');

const cors = require ('cors');

const morgan = require ('morgan')

const app = express();

const mongoose = require ('mongoose');

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
//listen for PORT

app.listen(PORT, () => console.log(`Listening on ${PORT}`))











