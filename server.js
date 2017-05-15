const
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  flash = require('connect-flash'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  Twitter = require('twitter')

const twitterClient = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
})

// environment port
const
  port = 3000,
  mongoConnectionString = 'mongodb://localhost/stalitics'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || "Connected to MongoDB (stalitics)")
})

// will store session information as a 'sessions' collection in MongoDB
const store = new MongoDBStore ({
  uri: mongoConnectionString,
  collection: 'sessions'
})

// middleware
app.use(express.static(__dirname + '/public'))
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// static routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login', {message: req.flash('loginMessage')})
})

app.get('/signup', (req, res) => {
  res.render('signup', {message: req.flash('signupMessage')})
})

app.listen(port, (err) => {
  console.log(err || "Server listening on port:", port)
})
