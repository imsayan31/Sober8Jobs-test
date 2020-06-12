const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

/* Loading Separate Routes */
const userRoutes = require('./routes/user');

/* Eshtablishing DB Connection */
mongoose.connect('mongodb://localhost/find-your-jobs', { useNewUrlParser: true, useUnifiedTopology: true })
.then((response) => {
  console.log('Find your jobs connected.');
}).catch((error) => {
  console.log('Failed to connect DB.');
});

/* Calling Body Parser for incoming post requests */
app.use(bodyParser.json());

/* Set up for ignoring CORS issue */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

/* Calling Routes */
app.use('/api/user', userRoutes);

module.exports = app;
