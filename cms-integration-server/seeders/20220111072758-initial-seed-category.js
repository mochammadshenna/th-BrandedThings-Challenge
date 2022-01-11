"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let categoryData = [
      { name: "Top", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bottom", createdAt: new Date(), updatedAt: new Date() },
      { name: "Footwear", createdAt: new Date(), updatedAt: new Date() },
      { name: "Accessories", createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert("Categories", categoryData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
