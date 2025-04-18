const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')
const Sequelize = require('sequelize')
const { Pool } = require('pg')

const sequelize = new Sequelize(DATABASE_URL)

const pgPool = new Pool({
  connectionString: DATABASE_URL
})


const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const db_conn = async () => {
    try {
      await sequelize.authenticate()
      await runMigrations()
      console.log('connected to the database')
    } catch (err) {
      console.log('failed to connect to the database')
      return process.exit(1)
    }
  
    return null
  }
  
  module.exports = { db_conn, sequelize, pgPool }