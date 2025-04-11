require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL)

const printBlogs = (blogList) => {
    for(let blog of blogList) {
        console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    }
}

const main = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT})
        printBlogs(blogs)
        sequelize.close()
      } catch (error) {
        console.error('Unable to connect to the database:', error)
      }
}

main()