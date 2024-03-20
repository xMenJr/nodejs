const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars').engine
const flash = require('express-flash');
const session = require('express-session');
const dotenv = require('dotenv')
const cookie = require('cookie');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()


dotenv.config({ path: path.join(__dirname, '.env') });
const port = process.env.PORT
const host_name = process.env.HOST_NAME

app.use(cors())

app.use(cookieParser())

const db = require('./config/db')
db.connect()

const route = require('./routers')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true 
}));

app.use(flash());

app.engine('.hbs', handlebars(
  { extname: '.hbs',
    helpers: {
      sum: function(a, b) {
        return a+b;
      },
      compare: function(a, b) {
        if(a == b) {
          return true;
        }
        return false;
      },
    }
  }
));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port at http://${host_name}:${port}`)
})