'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', 'offer',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      })
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('products', 'offer')
  }
};
