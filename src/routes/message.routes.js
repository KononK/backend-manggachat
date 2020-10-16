const Router = require('express').Router()
const messageController = require('../controllers/message.controller')
const verifyToken = require('../middlewares/auth')
const uploadFile2 = require('../middlewares/multerdoc')

Router
  .get('/', messageController.allMessage)
  .get('/message-room/:id', verifyToken, messageController.messageByRoom)
  .post('/', verifyToken, uploadFile2, messageController.sendMessage)
  .patch('/delete/:id', verifyToken, messageController.deleteMessage)

module.exports = Router