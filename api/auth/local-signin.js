const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Account = require('../models/account')

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  }

  // find a user by email address
  return Account.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err) }

    if (!user) {
      const error = new Error('Incorrect email or password')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    if (user.password !== userData.password) {
      const error = new Error('Incorrect email or password')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    return done(null, user)
  })
}))

// serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Account.findById(id, (err, user) => {
    done(err, user)
  })
})


module.exports = passport
