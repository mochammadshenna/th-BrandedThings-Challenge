const { Category } = require("../models/index");

const postCategory = async (req, res, next) => {
    const { name } = req.body;
    try {
        const newCategory = await Category.create({ name });
        res.status(201).json({ newCategory, message: `${newCategory.name} has been addedd successfully` });
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        let categoriesList = await Category.findAll();
        res.status(200).json({ categories: categoriesList });
    } catch (error) {
        next(error);
    }
};

const deleteCategoryById = async (req, res, next) => {
    let id = +req.params.id;
    try {
        let foundCategory = await Category.findByPk(id);
        if (!foundCategory) throw { name: "ERROR_NOT_FOUND", message: `Category id ${id} not found` };
        await Category.destroy({ where: { id } });
        res.status(200).json({ message: `${foundCategory.name} has been successfully deleted`, deletedEntry: foundCategory });
    } catch (error) {
        next(error);
    }
};

module.exports = { postCategory, getCategories, deleteCategoryById };
