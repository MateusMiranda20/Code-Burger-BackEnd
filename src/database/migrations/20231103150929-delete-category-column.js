'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.removeColumn('products', 'categoria');

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.createColumn('products', {
      categoria:{
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

  }
};
