const jwt = require('jsonwebtoken');

const generateJWT = (input) =>
    new Promise((resolve, reject) => {
        const payload = {
            ...input
        };

        jwt.sign(payload, process.env.jwt ,{ expiresIn: '72h' }, (err, token) => {
            if (err) {
                reject(Error('no se pudo generar el token'));
            }
            resolve(token);
        });
    });


module.exports = {
    generateJWT
}