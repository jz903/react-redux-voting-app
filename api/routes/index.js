import express from 'express'
import user from './user'
import auth from './auth'
import vote from './vote'

const router = express.Router()

router.use('/', auth)
router.use('/user', user)
router.use('/vote', vote)

export default router
