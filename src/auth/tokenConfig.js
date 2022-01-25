const jwt = require('jsonwebtoken');

const PASS_SECRET = 'paulynhopaulynho';
const JWT_CONFIG = {
  expiresIn: 3600,
  algorithm: 'HS256',
};
const generateToken = (user) => jwt.sign({ user }, PASS_SECRET, JWT_CONFIG);

 const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, PASS_SECRET);
    const { user } = decoded;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}; 

module.exports = {
  generateToken,
  validateToken,
}; 