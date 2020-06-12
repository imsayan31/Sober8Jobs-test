const express = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const router = express.Router();

/* Loading `User` Model */
const User = require('../model/user');

router.post('/signup', (req, res, next) => {
  console.log(req.body);

});

module.exports = router;
