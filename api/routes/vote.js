import express from 'express'
import Vote from '../models/vote'

const router = express.Router()

router.get('/', (req, res) => {
  Vote.find({}, (err, votes) => {
    if (err) {
      return res.status(400).send({
        error: err.message,
      })
    }

    return res.json(votes || [])
  })
})

router.post('/new', (req, res) => {
  const { options, ...rest } = req.body
  const newVote = new Vote({
    options: options.map(text => ({
      text,
    })),
    owner: {
      id: req.user.id,
      name: req.user.displayName,
    },
    ...rest,
  })

  newVote.save((err, vote) => {
    if (err) {
      return res.status(400).send({
        error: err.message,
      })
    }
    return res.json(vote)
  })
})

router.get('/:id', (req, res) => {
  const voteId = req.params.id

  Vote.findOne({ _id: voteId }, (err, vote) => {
    if (err) {
      return res.status(400).send({
        error: err.message,
      })
    }

    if (!vote) {
      return res.status(400).send({
        error: 'VoteNotExists',
      })
    }

    return res.json(vote)
  })
})

export default router
