"use strict";

const { hashPassword } = require("../helpers/bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let userData = [
      {
        username: "admin",
        email: "admin@mail.com",
        password: hashPassword("admin"),
        role: "admin",
        phoneNumber: "+6281122334455",
        address: "admin house",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "staff",
        email: "staff@mail.com",
        password: hashPassword("staff"),
        role: "staff",
        phoneNumber: "+6282233445566",
        address: "staff house",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "customer",
        email: "customer@mail.com",
        password: hashPassword("customer"),
        role: "customer",
        phoneNumber: "+6282233445566",
        address: "customer house",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", userData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
