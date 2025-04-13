const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
    await queryInterface.addColumn('users', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'created_at')
    await queryInterface.removeColumn('users', 'updated_at')
  }
}
