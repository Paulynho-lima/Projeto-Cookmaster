const { validateToken } = require('../auth/tokenConfig');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).json({ message: 'missing auth token' });

        const user = validateToken(authorization);
        if (!user) return res.status(401).json({ message: 'jwt malformed' });
       
        req.user = user;
        next();
    } catch (error) {
        console.log(`POST AUTHFALHA: ${error.message}`);
        return res.status(401).json({ message: 'jwt malformed' });
    }
};