const { usersCreate, loginCreate } = require('../services/usersServices');

const userControlCreate = async (req, res, next) => {
    try {
        const user = req.body;

        const users = await usersCreate(user);
        
        return res.status(201).json({ user: users });
    } catch (error) {
        console.log(`POST CREATEUSERS, ${error.message}`);
         return next(error);
    }
};

const createLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const token = await loginCreate(email, password);
        return res.status(200).json(token);
    } catch (error) {
        console.log(`POST CREATELOGIN: ${error.message}`);
        next(error);
    }
};

module.exports = {
    userControlCreate,
    createLogin,
};