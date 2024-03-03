'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Apple iPhone 13',
        brand: 'Apple',
        model: 'iPhone 13',
        price: 80000,
        color: 'black',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple iPhone 13 Pro',
        brand: 'Apple',
        model: 'iPhone 13 Pro',
        price: 100000,
        color: 'silver',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple iPhone 12',
        brand: 'Apple',
        model: 'iPhone 12',
        price: 70000,
        color: 'blue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apple iPhone 12 Mini',
        brand: 'Apple',
        model: 'iPhone 12 Mini',
        price: 60000,
        color: 'green',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy S21',
        brand: 'Samsung',
        model: 'Galaxy S21',
        price: 90000,
        color: 'violet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Note 20',
        brand: 'Samsung',
        model: 'Galaxy Note 20',
        price: 95000,
        color: 'bronze',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung Galaxy Z Flip',
        brand: 'Samsung',
        model: 'Galaxy Z Flip',
        price: 120000,
        color: 'pink',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi Redmi Note 10',
        brand: 'Xiaomi',
        model: 'Redmi Note 10',
        price: 20000,
        color: 'white',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi Mi 11',
        brand: 'Xiaomi',
        model: 'Mi 11',
        price: 30000,
        color: 'blue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi Poco X3 Pro',
        brand: 'Xiaomi',
        model: 'Poco X3 Pro',
        price: 25000,
        color: 'yellow',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
