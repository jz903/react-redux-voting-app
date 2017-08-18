import passport from 'passport'
import Strategy from 'passport-local'

import User from '../models/user'
import init from './init'

const LocalStrategy = Strategy.Strategy

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  // find a user by email address
  return User.findOne({ email: email.trim() }, (err, user) => {
    if (err) { return done(err) }

    if (!user) {
      const error = new Error('Incorrect email')
      error.name = 'IncorrectEmail'

      return done(error)
    }

    if (!user.validPassword(password.trim())) {
      const error = new Error('Incorrect password')
      error.name = 'IncorrectPassword'

      return done(error)
    }

    return done(null, user)
  })
}))

// serialize user into the session
init()


export default passport
