const connection = require('./connection');

const createUsers = async (name, email, password, role) => {
  const connect = await connection();
  const { insertedId } = await connect.collection('users').insertOne({
    name, email, password, role: 'user',
  });

  return { name, email, role, _id: insertedId };
};

const getUsersEmail = async (email) => {
  const connect = await connection();
  const userEamil = await connect.collection('users').findOne({ email });
  
  return userEamil;
};

module.exports = {
  createUsers,
  getUsersEmail,
};
