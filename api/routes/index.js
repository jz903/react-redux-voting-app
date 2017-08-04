const express = require('express')
const passportLocalSignup = require('../auth/local-signup')
const passportLocalSignin = require('../auth/local-signin')
const passportGithub = require('../auth/github')

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
  return passportLocalSignup.authenticate('local-signup', (err, user) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          error: 'EmailAlreadyExists',
        })
      }

      return res.status(400).json({
        error: 'ServerError',
      })
    }

    return req.login(user, error => {
      if (error) return next(error)
      return res.json(filteredUserProps(user))
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) =>
  passportLocalSignin.authenticate('local-signin', (err, user) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          error: err.name,
        })
      }

      return res.status(400).json({
        error: 'ServerError',
      })
    }

    return req.login(user, error => {
      if (error) return next(error)
      return res.json(filteredUserProps(user))
    })
  })(req, res, next),
)

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
