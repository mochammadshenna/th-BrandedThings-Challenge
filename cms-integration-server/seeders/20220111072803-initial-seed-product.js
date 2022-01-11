'use strict';
// const faker = require('faker')

// let data = []
// for (let i = 0; i < 50; i++) {
//   data.push({
//     name: faker.commerce.productName(),
//     product_code: faker.commerce.product_code(),
//     stock: Math.floor((Math.random() * 50) + 1) * 10,
//     product_image: faker.image.imageUrl(),
//     categoryId: Math.floor((Math.random() * 4) + 1),
//     authorId: Math.floor((Math.random() * 2) + 1),
//     status: 'active',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   })
// }

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [{
      name: "a",
      product_code: "asasasasasas",
      stock: 5,
      product_image: "https://ik.imagekit.io/bicin142/images_gTRXuVf5l.jpeg",
      categoryId: 1,
      authorId: 2,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
