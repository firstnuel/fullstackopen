const router = require('express').Router()
const { Blog } = require('../models')
const { User } = require('../models')
const { Op } = require("sequelize")
const { tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    const searchTerm = `%${req.query.search}%`;
    where[Op.or] = [
      { title: { [Op.iLike]: searchTerm } },
      { author: { [Op.iLike]: searchTerm } }
    ]
  }
  
  const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
          model : User,
          attributes: ['username']
      },
      where,
      order: [
        ['likes', 'DESC']
      ],
  })
  if (blogs.length) {
      res.json({
        status: "Success",
        message: "Blogs fetched successfully",
        data: blogs
    })
  } else {
      res.json({
        message: "No blog found",
        data: blogs
    })
  }
})

router.post('/', tokenExtractor, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: No user token provided' });
      }

    const blog = await Blog.create({ ...req.body, userId: req.user.id })
    if (!blog) {
        throw new Error("Validation Error")
    }

    res.json({
        success: "Blog added successfully", blog 
    })
})

router.put('/:id',tokenExtractor, blogFinder, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: No user token provided' });
    }

    if (!req.blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    if (req.user.id !== req.blog.userId) {
      return res.status(403).json({ error: 'Forbidden: You are not the blog owner' });
    }

    const updatedBlog = await req.blog.update({ ...req.body })
    res.json({ success: "Blog updated successfully", blog: updatedBlog })
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized: No user token provided' });
    }
  
    if (!req.blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
  
    if (req.user.id !== req.blog.userId) {
      return res.status(403).json({ error: 'Forbidden: You are not the blog owner' });
    }
  
    await req.blog.destroy();
    return res.status(204).end();
  });
  

module.exports = router