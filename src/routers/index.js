const newsRoute = require('./news')
const authRouter = require('./auth')
const userRouter = require('./user')
const siteRouter = require('./site')
const dashboardRouter = require('./dashboard')
const productRouter = require('./product')

function route (app) {

    app.use('/', siteRouter)
      
    app.use('/news', newsRoute)

    app.use('/auth', authRouter)

    app.use('/user', userRouter)

    app.use('/dashboard', dashboardRouter)

    app.use('/product', productRouter)

}

module.exports = route