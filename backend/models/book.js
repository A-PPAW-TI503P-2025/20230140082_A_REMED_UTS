'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Book has many BorrowLogs
      Book.hasMany(models.BorrowLog, {
        foreignKey: 'bookId',
        as: 'borrowLogs'
      });
    }
  }
  
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title tidak boleh kosong'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author tidak boleh kosong'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Stock tidak boleh negatif'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  
  return Book;
};