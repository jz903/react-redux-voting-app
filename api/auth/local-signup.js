import passport from 'passport'
import Strategy from 'passport-local'

import User from '../models/user'
import init from './init'

const LocalStrategy = Strategy.Strategy

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    username: req.body.username,
    displayName: req.body.displayName,
  }
  const newUser = new User(userData)

  newUser.password = newUser.generateHash(password.trim())

  return newUser.save((err, user) => {
    if (err) { return done(err) }
    return done(null, user)
  })
}))

// serialize user into the session
init()


export default passport
