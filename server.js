//DEPENDENCIES

const express = require ('express');

const cors = require ('cors');

const morgan = require ('morgan')

const app = express();

const { PORT = 4000 } = process.env;

require('dotenv').config();

//Middleware

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

//Routes 

const routesController = require ('./controllers/controllers.js');

app.use('/', routesController);

//listen for PORT

app.listen(PORT, () => console.log(`Listening on ${PORT}`))











