const blogsRouter =  require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { error } = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {username : 1, name : 1})
  response.json(blogs)
  })


blogsRouter.get("/:id", async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({error : "Blog not found"})

  response.json(blog)
})


blogsRouter.post('/', async (request, response) => {

  const body = request.body 
  const user = request.user
  body.likes = !body.likes ? 0 : body.likes

  if(!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }

  const blog = new Blog({...body, user:user.id})

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request , response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).json({ error: 'blog not found' })
  const user = request.user

  console.log(blog.user)

  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Token invalid or missing' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized: You can only update your own blogs' })
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const updatedBlogData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogData, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
