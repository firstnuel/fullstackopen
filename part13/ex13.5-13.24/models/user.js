const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')
const bcrypt = require('bcryptjs')

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
}) 

module.exports = User

User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword

})

User.afterFind(async (result, options) => {
    if (!result) return

    const stripPassword = (user) => {
        if (user?.dataValues) {
            delete user.dataValues.password
        }
    };

    if (Array.isArray(result)) {
        result.forEach(stripPassword);
    } else {
        stripPassword(result);
    }
})
