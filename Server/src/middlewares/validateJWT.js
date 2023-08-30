const jwt = require('jsonwebtoken');
const {error} = require('../helpers/response')
const User = require('../models/user.js');

//Validate JWT
const validateJWT = async (req, res, next) => {
    const token = req.header('xtoken');

    if (!token) {
        return error({
            req,
            res,
            message: 'Access denied. No token provided',
            status: 401
        }
        );
    }

    try {
        //uid of user from token
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Find user by id
        const user = await User.findById(id);

        //Check if user exist
        if (!user) {
            return error({
                req,
                res,
                message: 'User not found',
                status: 404});
        }

        //Verufy if user status is true
        if (!user.active) {
            return error({
                req,
                res,
                message: 'User deleted',
                status: 401
            });
        }

        req.user = user;

        next();
    } catch (err) {
        console.error(err.message);
        return error({
            res,
            message: 'User not found',
            status: 401
        });
    }
};

module.exports = { validateJWT };