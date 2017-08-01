const passport = require('passport')
const path = require('path')
const GitHubStrategy = require('passport-github2').Strategy
const User = require('../models/user')

require('dotenv').config({ path: path.join(__dirname, '../../.env') })

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRECT,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  const { displayName, username, id } = profile
  const searchQuery = {
    username,
  }

  const updates = {
    displayName,
    githubId: id,
    username,
  }

  const options = {
    upsert: true,
  }

  // update the user if s/he exists or add a new user
  User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
    if (err) {
      return done(err)
    }

    return done(null, user)
  })
}))

// serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})


module.exports = passport
