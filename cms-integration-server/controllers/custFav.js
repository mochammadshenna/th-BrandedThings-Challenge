const { Product, Favorite, User, Category } = require("../models/index");

const getCustomerFavs = async (req, res, next) => {
    try {
        const customerId = +req.user.id;
        const favoriteList = await Favorite.findAll({
            where: { customerId },
            attributes: { exclude: ["productId", "customerId"] },
            include: [
                {
                    model: Product, attributes: { exclude: ["authorId", "categoryId", "status"] }, include: [
                        {
                            model: User,
                            as: "createdBy",
                            attributes: ["id", "email"]
                        },
                        { model: Category, attributes: ["id", "name"] }
                    ]
                },
                { model: User, attributes: ["id", "email"] }
            ],
            order: [["createdAt", "DESC"]],
        });
        // if (favoriteList.length <1) res.status(404).json({name: "ERROR_NOT_FOUND", message: "You don't have any favorites yet"});
        res.status(200).json(favoriteList);
    } catch (error) {
        next(error);
    }
}


const postCustomerFavs = async (req, res, next) => {
    try {
        const productId = +req.params.productId
        const customerId = +req.user.id;

        let foundProduct = await Product.findByPk(productId);
        if (!foundProduct) throw { name: "ERROR_NOT_FOUND", message: `Product id ${productId} not found` };
        const [newFav, isCreated] = await Favorite.findOrCreate({
            where: { productId, customerId },
        });
        if (!isCreated) { res.status(400).json({ name: 'Bad Request', message: `${foundProduct.name} is already in your favorites` }) }
        const message = `${foundProduct.name} has been added to your favorites`
        res.status(201).json({ newFav, message });
    } catch (error) {
        next(error);
    }

}
const deleteCustomerFavsById = async (req, res, next) => {
    try {
        const id = +req.params.favoriteId
        const customerId = +req.user.id;

        let foundBookmark = await Favorite.findOne({ where: { id }, include: { model: Product } });
        if (!foundBookmark) throw { name: "ERROR_NOT_FOUND", message: `This item is not in your bookmark` };
        if (foundBookmark.customerId !== customerId) throw { name: "FORBIDDEN" }
        await Favorite.destroy({ where: { id } });
        res.status(200).json({ message: `${foundBookmark.Product.name} has been removed from your favorites` })
    } catch (error) {
        next(error);
    }
}



module.exports = { getCustomerFavs, postCustomerFavs, deleteCustomerFavsById }