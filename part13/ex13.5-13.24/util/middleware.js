const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { pgPool } = require('../util/db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)


const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    res.status(500).json({ error: err.message || 'Something went wrong' })
}

const tokenExtractor = (req, res, next) => {

    if (req.session.token) {
        const token = req.session.token
        try {
            const decodedToken = jwt.verify(token, SECRET)
            req.user = decodedToken
        } catch{
            return res.status(401).json({ error: 'token invalid' })
          }
    } else {
        return res.status(401).json({ error: 'No active session or token missing' })
    }
    next()
}

const isAuthenticated =  (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'No user found' })
    }
    if (req.user.disabled) {
        return res.status(401).json({ error: 'No user found' })
    }
    next()
}

const sessionHandler = () => (
    session({
        store: new pgSession({
          pool: pgPool, 
          tableName: 'user_sessions', 
        }),
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
      })
)

module.exports = {
    errorHandler,
    tokenExtractor,
    sessionHandler,
    isAuthenticated
}