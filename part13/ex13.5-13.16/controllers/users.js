const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    if (!user) throw new Error("Validation Error")
    res.json({
        status: "Success",
        message: "User created successfully",
        data: user
    })
})

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
      })
    if (users.length) {
        res.json({
            status: "Success",
            message: "Users fetched successfully",
            data: users
        })
    } else {
        res.json({
            message: "No user found",
            data: users
        })
    }
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: { username: req.params.username  }
    })
    if (!user) {
         return res.status(400).json({ "Error": "User not found" }) 
    }
    const updatedUser = await user.update({ ...req.body })
    res.json({
        status: "Success",
        message: "User updated successfully",
        data: updatedUser
    })
})

module.exports = router