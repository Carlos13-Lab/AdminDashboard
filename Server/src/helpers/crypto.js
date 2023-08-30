const CryptoJS = require('crypto-js');

const encryptPassword = (password) => {
    const hashedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

    return hashedPassword;
};

const comparePassword = (password, hashedPassword) => {
    const passwordDecrypted = CryptoJS.AES.decrypt(hashedPassword, process.env.PASS_SEC);
    const OriginalPassword = passwordDecrypted.toString(CryptoJS.enc.Utf8);

    return OriginalPassword === password;
};

module.exports = { encryptPassword, comparePassword };