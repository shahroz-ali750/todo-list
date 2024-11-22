const express = require('express')
const { signIn, register } = require('../controllers/todoUser.controller')

const router = express.Router()

router.post('/signIn',signIn)
router.post('/register',register)

module.exports = router