import passport from 'passport'
import Strategy from 'passport-local'
import Account from '../models/account'

const LocalStrategy = Strategy.Strategy

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    username: req.body.username,
    displayName: req.body.displayName,
  }
  const newUser = new Account(userData)

  return newUser.save((err, user) => {
    if (err) { return done(err) }
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


export default passport
