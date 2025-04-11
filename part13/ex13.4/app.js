const express = require('express')
require('dotenv').config()
const Blog = require('./model')

const app = express()
const PORT = process.env.PORT | 3000

app.use(express.json())
app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
    try {
        console.log(req.body)
        const blog = await Blog.create(req.body)
        res.json({"Success": "Blog added successfully" }, blog)
    } catch(error) {
        return res.status(400).json({ error })
      }
})

app.delete('/api/blogs/:id', async (req, res) => {
    const blogToDelete = await Blog.findByPk(req.params.id)
    if (blogToDelete) {
        blogToDelete.destroy()
        res.status(200).json({"Success": "Blog deleted successfully" })
    }
    else {
        return res.status(400).json({ "Error": "Blog not found" })
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


module.exports = app