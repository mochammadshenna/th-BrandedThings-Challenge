const { User } = require("../models/index");

const getUsers = async (req, res, next) => {
    const activeUser = { id: req.user.id, email: req.user.email, role: req.user.role };
    try {
        let usersList = await User.findAll({ order: [['id', 'ASC']] });
        res.status(200).json({ activeUser: activeUser, users: usersList });
    } catch (error) {
        next(error);
    }
};
module.exports = { getUsers };
