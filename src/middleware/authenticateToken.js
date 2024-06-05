const jwt = require('jsonwebtoken');
const helper = require('../helper/helper');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json(helper.formatApiResponse(401, 'Authentication failed'));
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json(helper.formatApiResponse(403, 'Token is not valid'));
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;