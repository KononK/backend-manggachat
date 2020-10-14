const router = require('express').Router()
const friendController = require('../controllers/friend.controller')
const verifyToken = require('../middlewares/auth')
const { FRIEND_SEND_REQ_FRIEND, FRIEND_ACC_REQ_FRIEND, FRIEND_REFUSE_REQ_FRIEND, FRIEND_DELETE_REQ_FRIEND } = require('../middlewares/errorValidation')
const uploadFile = require('../middlewares/multer')


router
  .get('/', friendController.getAllFriend)
  .get('/my-friend', verifyToken, friendController.getMyFriend)
  .post('/req-friend', verifyToken, FRIEND_SEND_REQ_FRIEND, friendController.sendReqFriend)
  .patch('/acc-friend', verifyToken, FRIEND_ACC_REQ_FRIEND, friendController.accFriend)
  .patch('/refuse-friend', verifyToken, FRIEND_REFUSE_REQ_FRIEND, friendController.refuseFriend)
  // .post('/', verifyToken, friendController.addFriend)
  .delete('/:id', verifyToken, FRIEND_DELETE_REQ_FRIEND, friendController.deleteRefuseFriend)

module.exports = router