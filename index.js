const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// init server
const app = express();

// el use es un middleware
app.use(cors());

dbConnection();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Alejandro Mira'
    })
});

app.listen(process.env.PORT, () => {
    console.log('run ', process.env.PORT)
});