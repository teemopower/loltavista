'use strict';
module.exports = function(sequelize, DataTypes) {
  var championname = sequelize.define('championname', {
    championId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return championname;
};