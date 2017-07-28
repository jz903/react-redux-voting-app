const express = require('express')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
const dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fcc-voting'

mongoose.connect(dbUrl)

app.use(cors())
app.set('port', process.env.PORT || 3001)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')))
  // send all requests to index.html so browserHistory in React Router works
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })
}

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

// handle api in routes
app.use('/api', routes)

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
