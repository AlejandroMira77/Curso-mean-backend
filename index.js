const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// init server
const app = express();

// el use es un middleware
app.use(cors());

// lectura y parseo del body
app.use( express.json() );

dbConnection();

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('run ', process.env.PORT)
});