'use strict';
module.exports = function(sequelize, DataTypes) {
  var lives = sequelize.define('lives', {
    summonerId: DataTypes.INTEGER,
    summonerName: DataTypes.STRING,
    championId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    championName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return lives;
};