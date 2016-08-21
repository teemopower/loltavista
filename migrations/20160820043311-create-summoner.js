'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('summoners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sumId: {
        type: Sequelize.INTEGER
      },
      sumName: {
        type: Sequelize.STRING
      },
      champName: {
        type: Sequelize.STRING
      },
      totalPlayer: {
        type: Sequelize.INTEGER
      },
      won: {
        type: Sequelize.INTEGER
      },
      winRate: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('summoners');
  }
};