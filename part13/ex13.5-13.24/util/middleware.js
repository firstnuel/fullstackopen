const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    res.status(500).json({ error: err.message || 'Something went wrong' })
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        try {
            decodedToken = jwt.verify(token, SECRET)
            req.user = decodedToken
        } catch{
            return res.status(401).json({ error: 'token invalid' })
          }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}