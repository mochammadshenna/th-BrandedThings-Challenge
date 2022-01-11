'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsTo(models.User, { as: "createdBy", foreignKey: "authorId" });
      Product.hasMany(models.History, { foreignKey: "productId" });
      Product.hasMany(models.Favorite, { foreignKey: "productId" });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Please input Product Name." },
        notNull: { args: true, msg: "Please input Product Name." },
      },
    },
    product_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Please input Product Code." },
        notNull: { args: true, msg: "Please input Product Code." },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Please input Stock." },
        notNull: { args: true, msg: "Please input Stock." },
        min: { args: 10000, msg: "Stock cannot be lower than 0." },
      },
    },
    product_image: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Categories", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
      validate: {
        notEmpty: { args: true, msg: "Please select Category." },
        notNull: { args: true, msg: "Please select Category." },
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onUpdate: "cascade",
      onDelete: "cascade",
      validate: {
        notEmpty: { args: true, msg: "Please select User." },
        notNull: { args: true, msg: "Please select User." },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active"
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};