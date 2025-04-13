const express = require('express')
require('express-async-errors')
const { PORT } = require('./util/config')
const { db_conn } = require('./util/db')
const { errorHandler } = require('./util/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingList = require('./controllers/reading_list')


const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingList)


app.use(errorHandler)

const start = async () => {
    await db_conn()
    app.listen(PORT, () => {
      console.log(`Server started and running on port ${PORT}`)
    })
}


start()


