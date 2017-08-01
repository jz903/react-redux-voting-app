const express = require('express')
const passport = require('passport')
const passportGithub = require('../socialAuth/github')
const User = require('../models/user')

const router = express.Router()
const isProduction = process.env === 'production'
const homePageUrl = isProduction ? '/' : 'http://localhost:3000/'

const filteredUserProps = user => {
  const { _doc } = user
  const { _id, __v, ...rest } = _doc

  return {
    id: _id,
    ...rest,
  }
}

router.get('/user', (req, res) => {
  if (req.user) {
    res.json(filteredUserProps(req.user))
  } else {
    res.status(401).send({
      error: 'NotSignIn',
    })
  }
})

router.post('/register', (req, res, next) => {
  let { username, password, email, displayName } = req.body

  username = username.trim()
  password = password.trim()
  email = email.trim()
  displayName = displayName.trim()

  const saveUserToDb = () => {
    const newUser = new User({
      username,
      password,
      email,
      displayName,
    })

    newUser.save((err, user) => {
      if (err) {
        return res.json({
          error: err.message,
        })
      }

      return passport.authenticate('local')(req, res, () => {
        req.session.save(sessionError => {
          if (sessionError) {
            return next(sessionError)
          }
          return res.json(filteredUserProps(user))
        })
      })
    })
  }

  User.find({ username }, (err, users) => {
    if (err) {
      res.json({
        error: err.message,
      })
    }

    if (users.length) {
      res.status(400).send({
        error: 'UsernameAlreadyExists',
      })
    } else {
      saveUserToDb()
    }
  })
})

router.post('/login', (req, res, next) => {
  let { email, password } = req.body

  email = email.trim()
  password = password.trim()

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.json({
        error: err.message,
      })
    }

    if (!user) {
      res.status(400).send({
        error: 'InvalidCredentials',
      })
    }

    return passport.authenticate('local')(req, res, () => {
      req.session.save(sessionError => {
        if (sessionError) {
          return next(sessionError)
        }
        return res.json(filteredUserProps(user))
      })
    })
  })
})

router.get('/auth/github', passportGithub.authenticate('github', { scope: ['user:email'] }))

router.get(
  '/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: `${homePageUrl}login` }),
  (req, res) => {
    // Successful authentication
    res.redirect(homePageUrl)
  },
)

router.get('/logout', (req, res) => {
  req.logout()
  res.json({
    success: true,
  })
})

module.exports = router
