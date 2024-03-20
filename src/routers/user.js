const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')
const middlewareController = require('../app/controllers/MiddlewareController')

router.get('/', middlewareController.loginToken, userController.getAllUsers)
router.delete('/:id', middlewareController.deleteToken, userController.deleteUser)

module.exports = router