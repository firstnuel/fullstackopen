const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')


class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1995,
          max(value) {
            const currentYear = new Date().getFullYear()
            if (value > currentYear) {
              throw new Error(`Year must be less than or equal to ${currentYear}`)
            }
          }
        }
      }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
  })


module.exports = Blog