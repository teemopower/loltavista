'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('lives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      summonerId: {
        type: Sequelize.INTEGER
      },
      summonerName: {
        type: Sequelize.STRING
      },
      championId: {
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER
      },
      championName: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('lives');
  }
};