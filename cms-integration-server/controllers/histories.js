const { History } = require("../models/index");

const getHistory = async (req, res, next) => {
    try {
        let historyList = await History.findAll({ order: [["id", "ASC"]] });
        res.status(200).json({ histories: historyList });
    } catch (error) {
        next(error);
    }
};

module.exports = { getHistory }
