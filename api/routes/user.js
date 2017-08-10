import express from 'express'

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

export default router
