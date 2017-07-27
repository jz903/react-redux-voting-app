const express = require('express')
const passportGithub = require('../auth/github')
const passportLocal = require('../auth/local')
const User = require('../models/user')

const router = express.Router()
const isProduction = process.env === 'production'
const homePageUrl = isProduction ? '/' : 'http://localhost:3000/'
const successCallback = (req, res) => {
  // Successful authentication
  res.redirect(homePageUrl)
}

router.get('/user', (req, res) => {
  if (req.user) {
    const { _id, rest } = req.user

    res.json({
      id: _id,
      ...rest,
    })
  } else {
    res.status(401).send({
      error: 'NotSignIn',
    })
  }
})

router.post('/register', (req, res) => {
  const { username, password } = req.body
  const newUser = User({
    username,
    password,
  })

  newUser.save(err => {
    if (err) {
      res.send({
        error: err.message,
      })
    }
    passportLocal.authenticate('local', { failureRedirect: `${homePageUrl}login` })
  })
}, successCallback)

router.post('/login', passportLocal.authenticate('local', { failureRedirect: `${homePageUrl}login` }), successCallback)

router.get('/auth/github', passportGithub.authenticate('github', { scope: ['user:email'] }))

router.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: `${homePageUrl}login` }), successCallback)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(homePageUrl)
})

module.exports = router
