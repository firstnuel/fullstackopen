const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')
const { omit } = require('lodash')

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

router.get('/:id', async (req, res) => {
  const { read } = req.query;

  let where = {};
  if (read === 'true') {
    where.read = true;
  } else if (read === 'false') {
    where.read = false;
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password', 'id', 'createdAt', 'updatedAt'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      as: 'readings',
      through: {
        attributes: ['read', 'id'],
        where,
      }
    }
  });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  res.json({
    status: "Success",
    message: "User fetched successfully",
    data: user
  })

})
 

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: { username: req.params.username  }
    })
    if (!user) {
         return res.status(400).json({ "Error": "User not found" }) 
    }
    const updatedUser = await user.update({ ...req.body })
    const returnData = updatedUser.toJSON()
    res.json({
        status: "Success",
        message: "User updated successfully",
        data: omit(updatedUser.toJSON(), ['createdAt'])
    })
})



module.exports = router