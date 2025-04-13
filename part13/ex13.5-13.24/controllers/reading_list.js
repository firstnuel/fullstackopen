const router = require('express').Router()
const { ReadingList } = require('../models')
const { Blog } = require('../models')
const { User } = require('../models')
const { tokenExtractor, isAuthenticated } = require('../util/middleware')

router.post('/', tokenExtractor, isAuthenticated, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: No user token provided' });
    }

    const blog = await Blog.findByPk(req.body.blogId)
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    const user = await User.findByPk(req.body.userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const addedToList = ReadingList.create(req.body)
    if (!addedToList) {
        throw new Error("Validation Error")
    }

    res.json({
        success: "Blog added to list successfully" 
    })
})

router.put('/:id', tokenExtractor, isAuthenticated, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized: No user token provided' });
    }

    const readingList = await ReadingList.findByPk(req.params.id)
    if (!readingList) {
        return res.status(404).json({ error: 'Reading-list not found' });
    }

    if (readingList.userId !== req.user.id) {
        return res.status(403).json({ error: 'Forbidden: You are not the owner of the Reading-list' });
    }  

    const updatedList = await readingList.update({ ...req.body} )

    res.json({
        success: "Reading-list updated successfully",
        updatedList,
    })
})

module.exports = router