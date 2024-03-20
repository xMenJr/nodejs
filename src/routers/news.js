const express = require('express')
const router = express.Router()

const newsController = require('../app/controllers/NewsController')

router.get('/', newsController.index)
router.get('/test', newsController.test)
router.get('/:slug', newsController.show)

module.exports = router