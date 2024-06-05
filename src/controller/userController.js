require('dotenv').config()
const helper = require("../helper/helper");
const userRepository = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
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