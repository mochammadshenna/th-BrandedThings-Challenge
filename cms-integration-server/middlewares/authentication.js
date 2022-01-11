const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authenticateUser = async (req, res, next) => {
    const { access_token } = req.headers;
    try {
        const verifiedUser = verifyToken(access_token);
        const validUser = await User.findOne({ where: { email: verifiedUser.email } });
        req.user = { id: validUser.id, email: validUser.email, role: validUser.role };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticateUser;
