const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/ProductController')

router.get('/quickview/:id', productController.quickview)
router.get('/:id', productController.product_detail)


module.exports = router