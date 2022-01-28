//DEPENDENCIES

const express = require ('express');

const cors = require ('cors');

const morgan = require ('morgan')

const app = express();

const { PORT = 4000 } = process.env;

//Middleware

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());


app.listen(PORT, () => console.log(`Listening on ${PORT}`))











