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
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/medicals', require('./routes/medicals'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('run ', process.env.PORT)
});