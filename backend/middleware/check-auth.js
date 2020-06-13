const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('')[1];
    const decodedToken = jwt.verify(token, 'login_secret_token');
    req.userData = {
      token: token,
      userId: decodedToken.userId,
      email: decodedToken.email
    };
    next();
  } catch (error) {
    res.status(404).json({
      message: 'Token not matched!'
    })
  }

}
