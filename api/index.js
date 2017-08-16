import express from 'express'
import cors from 'cors'
import path from 'path'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import mongoose from 'mongoose'

import routes from './routes'

const app = express()
const dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/react-redux-voting'

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
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/api', routes)

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
})
