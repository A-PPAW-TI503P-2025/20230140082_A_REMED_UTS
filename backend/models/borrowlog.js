'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BorrowLog extends Model {
    static associate(models) {
      // BorrowLog belongs to Book
      BorrowLog.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      });
    }
  }

  BorrowLog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BorrowLog',
  });

  return BorrowLog;
};