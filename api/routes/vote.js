import express from 'express'
import Vote from '../models/vote'

const router = express.Router()

router.get('/', (req, res) => {
  const user = req.user

  Vote.find({}, (err, votes) => {
    if (err) {
      return res.status(400).send({
        error: err.message,
      })
    }

    return res.json(votes.map(vote => ({
      ...vote.toObject(),
      isOwner: user && (vote.owner.id === user.id),
    })))
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

router.put('/:id', (req, res) => {
  const voteId = req.params.id
  const { options, ...rest } = req.body

  Vote.findOneAndUpdate(
    { id: voteId },
    { $set: {
      options: options.map(text => ({
        text,
      })),
      ...rest,
    },
    },
    { new: true }, // return the doc after updates in callback
    (err, vote) => {
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
    },
  )
})

router.get('/:id', (req, res) => {
  const voteId = req.params.id
  const user = req.user

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

    return res.json({
      ...vote.toObject(),
      isOwner: user && (vote.owner.id === user.id),
    })
  })
})

export default router
