const { User, Product} = require('../models/Schema')
const { mutipleMongooseToObj } = require("../../until/mongoose");

class NewsController {

    // GET /news
    index (req, res, next) {
        res.render('news')
    }

    show (req, res, next) {
        res.send('Slug of news')
    }

    test (req, res, next) {
        User.find({})
            .then(account => res.render('authentication/test', {
                account: mutipleMongooseToObj(account)
            }))
    }
}

module.exports = new NewsController;