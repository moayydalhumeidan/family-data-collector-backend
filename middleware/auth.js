'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config'); // Assuming you have a config file with your secret

/**
 * Middleware to validate JWT
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 * @param {Function} next - Next middleware function
 */
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

    if (token) {
        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
