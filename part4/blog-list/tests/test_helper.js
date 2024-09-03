const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Initial Blogs
const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'John Doe',
    url: 'http://example.com/html',
    likes: 5,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Jane Doe',
    url: 'http://example.com/js',
    likes: 10,
  },
]

// Initial Users (with password hashes)
const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'sekret', // This will be hashed before saving
  },
  {
    username: 'user1',
    name: 'First User',
    password: 'password123', // This will be hashed before saving
  },
]

// Utility function to create non-existing blog id
const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'temp', url: 'temp.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

// Utility function to get all blogs from DB
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// Utility function to get all users from DB
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

// Utility function to create initial users with hashed passwords
const createInitialUsers = async () => {
  await User.deleteMany({})

  const userPromises = initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const userObject = new User({ ...user, passwordHash })
    return userObject.save()
  })

  await Promise.all(userPromises)
}

module.exports = {
  initialUsers,
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  createInitialUsers,
}
