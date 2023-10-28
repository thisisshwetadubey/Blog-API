const express = require('express')
const router = express.Router()

const {createPost}= require('../controller/createPost')
const {getPost,singlePost, latestPost} = require('../controller/getPost')
const {updatePost} = require('../controller/updatePost')
const {deletePost} = require('../controller/deletePost')


router.post('/',createPost )
router.get('/latest',latestPost)
router.get('/',getPost)
router.get('/:id', singlePost)
router.put('/:id',updatePost)
router.delete('/:id', deletePost)

module.exports = router
