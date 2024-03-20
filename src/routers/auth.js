const express = require('express')
const router = express.Router()

const authController = require('../app/controllers/AuthController')

router.get('/login', authController.login)
router.post('/login', authController.checklogin)
router.get('/register', authController.register)
router.post('/register', authController.checkregister)
router.post('/refresh', authController.refresh)
router.get('/logout', authController.logout)

module.exports = router