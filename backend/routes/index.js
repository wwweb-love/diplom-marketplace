const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/admin', require('./admin'))
router.use('/', require('./main'))

module.exports = router