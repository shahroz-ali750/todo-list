const express = require('express')
const { getTodo, postTodo, patchTodo, deleteTodo } = require('../controllers/todo.controller')

const router = express.Router()



router.get('/',getTodo)
router.post('/',postTodo)
router.patch('/:id',patchTodo)
router.delete('/:id',deleteTodo)

module.exports = router