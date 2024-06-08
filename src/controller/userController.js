require('dotenv').config()
const helper = require("../helper/helper");
const userRepository = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const UserController = {
    getUsers: async (req, res, next) => {
        let statusCode = 200;
        let message = 'User data fetch successfully';
        let context = {};
        try {
            let user = await userRepository.findAll();
            if (user.length > 0) {
                context = user;
            }
            else {
                statusCode = 404;
                message = 'User data not found';
            }
        } catch (error) {
            console.log(error);
            statusCode = 500;
            context = {
                name: error.name,
                errors: [{
                    message: error.errors[0].message,
                    type: error.errors[0].type
                }]
            };
        }
        return res.status(statusCode).json(
            helper.formatApiResponse(
                statusCode,
                message,
                context
            )
        );
    },
    userProfile: async (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json(helper.formatApiResponse(401, 'Access Denied. No refresh token provided.'));
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await userRepository.findById(decoded.userId);
            res.status(200).json(helper.formatApiResponse(200, 'User profile fetch successfully', { 'user': user }));
        } catch (error) {
            return res.status(400).json(helper.formatApiResponse(400, 'User profile fetch failed.'));
        }
    },
    create: async (req, res, next) => {
        let statusCode = 500;
        let message = 'Failed to create user';
        let context = {};
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            user = await userRepository.store(req.body);
            if (user.id) {
                statusCode = 201
                message = 'Successfully create new user';
                context = user;
            }
            else {
                statusCode = 500;
            }
        } catch (error) {
            statusCode = 500;
            context = {
                name: error.name,
                errors: [{
                    message: error.errors[0].message,
                    type: error.errors[0].type
                }]
            };
        }
        return res.status(statusCode).json(
            helper.formatApiResponse(
                statusCode,
                message,
                context
            )
        );
    },

    update: async (req, res, next) => {
        let statusCode = 500;
        let message = 'Failed to update user';
        let context = {};
        let id = req.params.id;
        try {
            if (req.body.password) {
                delete req.body.password;
            }
            user = await userRepository.update(req.body, id);
            if (user.id) {
                statusCode = 200
                message = 'Successfully update user';
                context = user;
            }
            else {
                statusCode = 500;
            }
        } catch (error) {
            statusCode = 500;
            context = {
                name: error.name,
                errors: [{
                    message: error.errors[0].message,
                    type: error.errors[0].type
                }]
            };
        }
        return res.status(statusCode).json(
            helper.formatApiResponse(
                statusCode,
                message,
                context
            )
        );
    }
}
module.exports = UserController;