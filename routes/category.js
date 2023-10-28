const express = require('express')
const router = express.Router()

const {createCategory}= require('../controller/createCategory')

router.post('/',createCategory )


module.exports = router
