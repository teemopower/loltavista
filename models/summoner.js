'use strict';
module.exports = function(sequelize, DataTypes) {
  var summoner = sequelize.define('summoner', {
    sumId: DataTypes.INTEGER,
    sumName: DataTypes.STRING,
    champName: DataTypes.STRING,
    totalPlayer: DataTypes.INTEGER,
    won: DataTypes.INTEGER,
    winRate: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return summoner;
};