const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/admin', require('./admin'))
router.use('/', require('./main'))
router.use("/auth", require("./auth"))
router.use('/product', require("./product"))
router.use("/basket", require("./basket"))

module.exports = router