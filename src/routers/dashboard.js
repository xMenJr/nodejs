const express = require('express')
const router = express.Router()

const adminController = require('../app/controllers/AdminController')

router.get('/', adminController.index)
router.get('/add_productview', adminController.add_productview)
router.post('/addproduct', adminController.addproduct)

module.exports = router