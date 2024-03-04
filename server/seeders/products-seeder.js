'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Xiaomi Redmi Note 9',
        brand: 'Xiaomi',
        model: 'Redmi Note 9',
      },
      {
        name: 'iPhone 12',
        brand: 'Apple',
        model: 'iPhone 12',
      }
      // Adicione mais produtos conforme necessário
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
};
