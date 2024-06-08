require('dotenv').config()
const helper = require("../helper/helper");
const userRepository = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
    comparePassword: async (user_imputed_password, database_has_password) => {
        return bcrypt.compare(user_imputed_password, database_has_password);
    },

    login: async (req, res, next) => {
        try {
            const user = await userRepository.findByUserName(req.body.username);
            if (!user) {
                return res.status(401).json(helper.formatApiResponse(401, 'Authentication failed'));
            }
            const isPasswordValid = await AuthController.comparePassword(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json(helper.formatApiResponse(401, 'Authentication failed'));
            }
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' })
            res.status(200).json(helper.formatApiResponse(200, 'Token generation successfully', { 'token': token }));
        } catch (error) {
            return res.status(500).json(helper.formatApiResponse(500, 'Authentication failed'));
        }
    },

    refresh: async (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json(helper.formatApiResponse(401, 'Access Denied. No refresh token provided.'));
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            const accessToken = jwt.sign({ userId: decoded.userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json(helper.formatApiResponse(200, 'Token generation successfully', { 'token': accessToken }));
        } catch (error) {
            return res.status(400).json(helper.formatApiResponse(400, 'Invalid refresh token.'));
        }
    }
}
module.exports = AuthController;