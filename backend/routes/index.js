const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/admin', require('./admin'))
// router.use('/products', require('./products'))

module.exports = router