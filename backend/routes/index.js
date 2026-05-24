const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/admin', require('./admin'))
router.use('/', require('./main'))
router.use("/auth", require("./auth"))

module.exports = router