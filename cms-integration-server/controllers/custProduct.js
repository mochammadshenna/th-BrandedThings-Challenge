const { getPagination, getPagingData } = require("../helpers/pagination");
const { Op } = require("sequelize");
const { Product, Category, User, Favorite } = require("../models/index");

const getCustomerProducts = async (req, res, next) => {
    let { size, page, name, category, min, max } = req.query;

    try {
        let conditions = { status: "active" };

        size = size ? +size : 9;
        page = page ? +page : 1;

        //CATEGORY FILTER
        if (category) conditions.categoryId = category.split(",");

        //PRICE FILTER
        min = min ? min : 0;
        max = max ? max : Number.MAX_SAFE_INTEGER;
        conditions.price = { [Op.between]: [min, max] };

        //NAME FILTER
        if (name) {
            let searchWords = name.split(",").map((e) => `%${e}%`);
            searchWords = searchWords.map((keyword) => {
                return { [Op.iLike]: keyword };
            });
            conditions.name = { [Op.or]: searchWords };
        }

        const { limit, offset } = getPagination(page, size);
        console.log(conditions);
        let productList = await Product.findAndCountAll({
            limit,
            offset,
            where: conditions,
            attributes: { exclude: ["categoryId", "authorId"] },
            include: [
                {
                    model: User,
                    as: "createdBy",
                    attributes: ["id", "email"],
                    required: true,
                },
                {
                    model: Category,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    required: true,
                },
                // {
                //   model: Favorite,
                //   attributes: { exclude: ["productId", "customerId"] },
                //   include: { model: User, attributes: ["id", "email"] },
                // },
            ],
            order: [["id", "ASC"]],
        });
        console.log(productList.count);
        if (productList.count == 0)
            throw { name: "ERROR_NOT_FOUND", message: "No products available" };
        res.status(200).json(getPagingData(productList, page, limit));
    } catch (error) {
        next(error);
    }
};

const getCustomerProductById = async (req, res, next) => {
    let id = +req.params.id;
    try {
        let foundProduct = await Product.findOne({
            where: { id, status: "active" },
            attributes: { exclude: ["categoryId", "authorId"] },
            include: [
                {
                    model: User,
                    as: "createdBy",
                    attributes: ["id", "email"],
                },
                {
                    model: Category,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                {
                    model: Favorite,
                    attributes: { exclude: ["productId", "customerId"] },
                    include: { model: User, attributes: ["id", "email"] },
                },
            ],
        });
        if (!foundProduct)
            throw { name: "ERROR_NOT_FOUND", message: `Product id ${id} not found` };
        res.status(200).json(foundProduct);
    } catch (error) {
        next(error);
    }
};

module.exports = { getCustomerProducts, getCustomerProductById };
