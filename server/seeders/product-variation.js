'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('variations', [
      {
        productId: 1, // Assumindo que o produto com productId 1 existe
        color: 'Black',
        price: 10000,
   
      },
      {
        productId: 2, // Assumindo que o produto com productId 2 existe
        color: 'White',
        price: 12000,
      
      }
      // Adicione mais variações conforme necessário
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('variations', null, {});
  }
};
