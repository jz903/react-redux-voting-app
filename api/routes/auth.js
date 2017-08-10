import express from 'express'
import passportLocalSignup from '../auth/local-signup'
import passportLocalSignin from '../auth/local-signin'
import passportGithub from '../auth/github'
import { homePageUrl } from '../utils'

const router = express.Router()

router.post('/register', (req, res, next) =>
  passportLocalSignup.authenticate('local-signup', (err, user) => {
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
      return res.json(user)
    })
  })(req, res, next),
)

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
      return res.json(user)
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

export default router
