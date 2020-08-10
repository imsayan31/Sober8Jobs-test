const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* Loading Separate Routes */
const userRoutes = require('./routes/frontend/user');
const adminRoutes = require('./routes/admin-end/user');

/* Eshtablishing DB Connection */
mongoose.connect('mongodb://localhost/find-your-jobs', { useNewUrlParser: true, useUnifiedTopology: true })
.then((response) => {
  console.log('Find your jobs connected.');
}).catch((error) => {
  console.log('Failed to connect DB.');
});

/* Calling Body Parser for incoming post requests */
app.use(bodyParser.json());

/* For fetching static data */
app.use('/images', express.static(path.join('backend/images')));

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
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* Calling Routes */
app.use('/api/user', userRoutes);
app.use('/api/admin/user', adminRoutes);

module.exports = app;
