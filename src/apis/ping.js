const router = require('express').Router()

// for health check
router.get('/', (req, res) => {
  res.send('pong!')
})

module.exports = router