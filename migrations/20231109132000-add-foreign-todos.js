'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Todos','user_id',{
      type:Sequelize.INTEGER,
      references:{
        model:'Users',
        key:'id'
      },
      allowNull:false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Todos', 'user_id')
  }
};
