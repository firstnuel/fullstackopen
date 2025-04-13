const router = require('express').Router()


router.delete('/', (req, res) => {
    req.session.destroy(err => {
      if (err) return res.status(500).send(
        { 
            message: "User logout failed", 
         }
      )
      res.send({ 
        message: "User logout successful", 
     })
    })
  })

module.exports = router