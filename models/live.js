'use strict';
module.exports = function(sequelize, DataTypes) {
  var live = sequelize.define('live', {
    summonerId: DataTypes.INTEGER,
    summonerName: DataTypes.STRING,
    championId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return live;
};