const bcrypt = require("bcryptjs");

function hashPassword(vanillaPassword) {
    let salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(vanillaPassword, salt);
}

function comparePassword(passwordInput, hashedUserPassword) {
    return bcrypt.compareSync(passwordInput, hashedUserPassword);
}

module.exports = { hashPassword, comparePassword };