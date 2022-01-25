const Joi = require('joi');
const { generateToken } = require('../auth/tokenConfig');
const { createUsers, getUsersEmail } = require('../models/usersModels');
const errorMessages = require('../utills/errosUtills');

const validUsers = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Invalid entries. Try again.',
  }), 
  email: Joi.string().email().required().messages({
    'any.required': 'Invalid entries. Try again.',
    'string.email': 'Invalid entries. Try again.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Invalid entries. Try again.',
  }),
});

const usersCreate = async ({ name, email, password, role = 'user' }) => {
  const { error } = validUsers.validate({
   name, email, password,
  });

  if (error) throw errorMessages(400, error.message);

   const emailUsers = await getUsersEmail(email);
   
  if (emailUsers) throw errorMessages(409, 'Email already registered');
  
  const users = await createUsers(name, email, password, role);

  return users;
};

const validLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'All fields must be filled',
    'string.email': 'Incorrect username or password',
  }),
  password: Joi.string().required().messages({
    'any.required': 'All fields must be filled',
  }),
});

const loginCreate = async (email, password) => {
  const { error } = validLogin.validate({
   email, password, 
  });
  if (error) throw errorMessages(401, error.message);

  const users = await getUsersEmail(email);

  if (!users || users.password !== password) {
    throw errorMessages(401, 'Incorrect username or password');
  }
  const gerarToken = generateToken(email, password);

    return { token: gerarToken };
};

module.exports = {
  usersCreate,
  loginCreate,
};