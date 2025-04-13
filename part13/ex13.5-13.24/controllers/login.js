const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { SECRET } = require('../util/config')


router.post('/', async (req, res) => {

    const user = await User.findOne({ 
        where: { username: req.body.username },
        logging: false, 
        skipPasswordStrip: true 
    })

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if(!(user && passwordMatch)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username, 
        id: user.id,
        disabled: user.disabled 
    }

    const token = jwt.sign(userForToken, SECRET)
    req.session.token = token

    res
    .status(200)
    .send({ 
        message: "User login successful", 
        username: user.username
     })
})

module.exports = router