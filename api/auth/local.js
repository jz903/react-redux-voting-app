const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const init = require('./init')

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.find({ username }, (err, user) => {
      if (err) return done(err)
      if (!user) return done(null, false)
      if (user.password !== password) return done(null, false)
      return done(null, user)
    })
  }))

// serialize user into the session
init()


module.exports = passport
