const { Product, Category } = require("../models");

const authorizeUser = async (req, res, next) => {
    const role = req.user.role;
    const userId = +req.user.id;
    const id = +req.params.id;
    try {
        const foundProduct = await Product.findByPk(id);
        if (!foundProduct) throw { name: "ERROR_NOT_FOUND", message: `Product id ${id} not found` };
        if (role == "admin" || (role == "staff" && userId == foundProduct.authorId)) next();
        else throw { name: "FORBIDDEN" };
    } catch (error) {
        next(error);
    }
};

const authorizeUserCat = async (req, res, next) => {
    const role = req.user.role;
    const id = +req.params.id;
    try {
        const foundCategory = await Category.findByPk(id);
        if (!foundCategory) throw { name: "ERROR_NOT_FOUND", message: `Category id ${id} not found` };
        if (role == "admin") next();
        else throw { name: "FORBIDDEN" };
    } catch (error) {
        next(error);
    }
};

const authorizeUserPatch = async (req, res, next) => {
    const role = req.user.role;
    const id = +req.params.id;
    try {
        const foundProduct = await Product.findByPk(id);
        if (!foundProduct) throw { name: "ERROR_NOT_FOUND", message: `Product id ${id} not found` };
        if (role == "admin") next();
        else throw { name: "FORBIDDEN" };
    } catch (error) {
        next(error);
    }
}
const authorizeCustomerFavs = async (req, res, next) => {
    try {
        const role = req.user.role
        if (role === 'customer') next();
        else throw { name: 'NOT_CUSTOMER' };
    } catch (error) {
        next(error);
    }
};


module.exports = { authorizeUser, authorizeUserCat, authorizeUserPatch, authorizeCustomerFavs }
