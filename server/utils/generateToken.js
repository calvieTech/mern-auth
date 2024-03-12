const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  // create the token with payload and secret and expiration date
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // console.log(token);

  res.cookie('jwt', token, {
    httpOnly: false,
    secure: true,
    // secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'none', // Prevent CSRF attacks
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // console.log(res);
  return token;
  // const cookieVal = req.cookies.jwt;
  // console.log(cookieVal);
};

module.exports = generateToken;
