const jwt = require('jsonwebtoken');

const generateJWT = (id, userName, role) =>
    new Promise((resolve, reject) => {
        const payload = {
            id,
            userName,
            role,
        };

        jwt.sign(payload, process.env.jwtsec ,{ expiresIn: '72h' }, (err, token) => {
            if (err) {
                reject(Error('no se pudo generar el token'));
            }
            resolve(token);
        });
    });


module.exports = {
    generateJWT
}