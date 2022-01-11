"use strict";

const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: "authorId" });
      User.hasMany(models.Favorite, { foreignKey: 'customerId' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please input email." },
          notNull: { msg: "Please input email." },
          isEmail: { msg: "Please input a valid email." },
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Please input Password" },
          notNull: { msg: "Please input Password." },
          len: { args: { min: 5 }, msg: "Password length must be at least 5 characters." },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "admin",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(newUser) {
          let hashedPassword = hashPassword(newUser.password);
          newUser.password = hashedPassword;
        },
      },
    }
  );
  return User;
};
