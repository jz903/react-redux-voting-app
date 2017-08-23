import express from 'express'
import User from '../models/user'

const router = express.Router()

router.get('/', (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(401).send({
      error: 'NotSignIn',
    })
  }
})

router.put('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      error: 'NotSignIn',
    })
  }

  const { username, email, displayName } = req.body
  const update = {
    username,
    email,
    displayName,
  }
  const updateUser = () => {
    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: update,
      },
      { new: true }, // return the doc after updates in callback
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: err.message,
          })
        }

        if (!user) {
          return res.status(400).send({
            error: 'UserNotExists',
          })
        }

        return res.json(user)
      },
    )
  }

  if (req.user.email !== email) {
    // if email updates, check if the email exists in db
    return User.findOne(
      { email },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: err.message,
          })
        }

        if (user && user.id !== req.user.id) {
          // email exists in db and is not the req.user's email
          return res.status(400).json({
            error: 'EmailAlreadyExists',
          })
        }

        return updateUser()
      },
    )
  }

  return updateUser()
})

export default router
