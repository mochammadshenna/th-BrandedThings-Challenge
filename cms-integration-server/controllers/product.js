const { Product, Category, User, History } = require("../models/index");

const postProduct = async (req, res, next) => {
    const { name, product_code, product_image, stock, categoryId } = req.body;
    const authorId = req.user.id;
    const email = req.user.email;
    try {
        const newProduct = await Product.create({ name, product_code, stock, product_image, categoryId, authorId });
        const message = `New product ${newProduct.name} with id ${newProduct.id} created`
        const newHistory = {
            productId: newProduct.id,
            name: newProduct.name,
            product_code: message,
            updatedBy: email
        }
        await History.create(newHistory)
        res.status(201).json({ newProduct, message });
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    const activeUser = { id: req.user.id, email: req.user.email, role: req.user.role };
    try {
        let productList = await Product.findAll({ order: [["id", "DESC"]], include: [Category, { model: User, as: 'createdBy' }] });
        res.status(200).json({ activeUser: activeUser, products: productList });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    let id = +req.params.id;
    try {
        let foundProduct = await Product.findByPk(id, { include: [Category, User] });
        if (!foundProduct) throw { name: "ERROR_NOT_FOUND", message: `Product id ${id} not found` };
        res.status(200).json(foundProduct);
    } catch (error) {
        next(error);
    }
};

const updateProductById = async (req, res, next) => {
    let id = +req.params.id;
    let { name, product_code, stock, product_image, categoryId } = req.body;
    const authorId = req.user.id;
    const email = req.user.email;
    try {
        let foundProduct = await Product.findByPk(id);
        if (!foundProduct) throw { name: "ERROR_NOT_FOUND", message: `Product id ${id} not found` };
        let updatedProduct;
        if (!product_image) { updatedProduct = { name, product_code, stock, categoryId, authorId } }
        else { updatedProduct = { name, product_code, stock, product_image, categoryId, authorId } }

        const result = await Product.update(updatedProduct, { where: { id }, returning: true });
        const productAfterUpdate = result[1][0]

        const message = `Product with id ${productAfterUpdate.id} updated.`
        const newHistory = {
            productId: productAfterUpdate.id,
            name: productAfterUpdate.name,
            product_code: message,
            updatedBy: email
        }
        await History.create(newHistory)
        res.status(200).json({ message, updatedProduct: productAfterUpdate });
    } catch (error) {
        next(error);
    }
};

const deleteProductById = async (req, res, next) => {
    let id = +req.params.id;
    try {
        let foundProduct = await Product.findByPk(id);
        if (!foundProduct) throw { name: "ERROR_NOT_FOUND", message: `Product id ${id} not found` };
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: `${foundProduct.name} has been successfully deleted`, deletedEntry: foundProduct });
    } catch (error) {
        next(error);
    }
}

const patchProductStatusById = async (req, res, next) => {
    let id = +req.params.id;
    const status = req.body.status
    const email = req.user.email;
    try {
        if (status !== 'archived' && status !== 'active' && status !== 'inactive') throw { name: 'Bad Request', message: "Status can only be 'active', 'inactive', or 'archived'" }
        let foundProduct = await Product.findByPk(id);
        if (!foundProduct) throw { name: "ERROR_NOT_FOUND", message: `Product id ${id} not found` };
        let originalStatus = foundProduct.status
        const result = await Product.update({ status }, { where: { id }, returning: true });
        let productAfterUpdate = result[1][0]
        const message = `Product with id ${productAfterUpdate.id} status has been updated from ${originalStatus} to ${productAfterUpdate.status}.`
        const newHistory = {
            productId: productAfterUpdate.id,
            name: productAfterUpdate.name,
            product_code: message,
            updatedBy: email
        }
        await History.create(newHistory)
        res.status(200).json({ message, updatedProduct: productAfterUpdate });
    } catch (error) {
        next(error);
    }
}



module.exports = { postProduct, getProducts, getProductById, updateProductById, deleteProductById, patchProductStatusById };
