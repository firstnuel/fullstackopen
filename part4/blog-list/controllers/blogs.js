const blogsRouter =  require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
  })

blogsRouter.get("/:id", async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({error : "Blog not found"})

  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  if(!request.body.likes)request.body.likes=0
  if(!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request , response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request , response) => {
  const body = request.body
  
  const newBlog = {
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new:true})
  response.json(updatedBlog)


})












module.exports = blogsRouter