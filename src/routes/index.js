const express = require('express')
const router = express.Router()

const userRoutes = require('./user.routes')
const authRoutes = require('./auth.routes')
const roomRoutes = require('./room.routes')
const messageRoutes = require('./message.routes')
const friendRoutes = require('./friend.routes')

router
  .use('/auth', authRoutes)
  .use('/users', userRoutes)
  .use('/rooms', roomRoutes)
  .use('/messages', messageRoutes)
  .use('/friends', friendRoutes)

module.exports = router