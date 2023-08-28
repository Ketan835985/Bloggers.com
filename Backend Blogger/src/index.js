/* eslint-disable no-undef */
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(multer().any());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log('Mongoose Connect started '))
    .catch((error) => console.log('Mongoose Connect error', error.message))

app.use('/', routes)

app.listen(process.env.PORT || 5000, () => {
    console.log('Server started on port', process.env.PORT || 5000);
})