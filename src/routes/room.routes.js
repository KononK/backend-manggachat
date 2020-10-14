const router = require('express').Router()
const roomController = require('../controllers/room.controller')
const verifyToken = require('../middlewares/auth')
const uploadFile2 = require('../middlewares/multerdoc')
const { ROOM_ADD_PUBLIC, ROOM_UPDATE_PUBLIC, ROOM_INVITE_USER } = require('../middlewares/errorValidation')

router
  .get('/', roomController.allRoom)
  .get('/my-room', verifyToken, roomController.myRoom)
  // .get('/my-room-summary', verifyToken, roomController.getMyRoomSummary)
  // .get('/find-room/:id', verifyToken, roomController.findRoom)
  .post('/public-room', verifyToken, ROOM_ADD_PUBLIC, roomController.addPublicRoom)
  // .post('/private-room', verifyToken, roomController.addRoomPrivate)
  .post('/invite', verifyToken, ROOM_INVITE_USER, roomController.inviteUser)
  // .get('/room-image/:id', verifyToken, roomController.getRoomImage)
  // .get('/room-document/:id', verifyToken, roomController.getRoomDocument)
  .get('/:id', verifyToken, roomController.detailRoom)
  .patch('/:id', verifyToken, ROOM_UPDATE_PUBLIC, roomController.updateRoom)
  // .delete('/:id', verifyToken, roomController.deleteRoom)

module.exports = router