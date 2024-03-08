const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  // create the token with payload and secret and expiration date
  const token = jwt.sign({ userId }, `${process.env.JWT_SECRET}`, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports = generateToken;
