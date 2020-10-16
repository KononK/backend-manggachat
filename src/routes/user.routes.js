const router = require('express').Router()
const userController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/auth')
const uploadFile = require('../middlewares/multer')

const { USER_UPDATE_PROFILE } = require('../middlewares/errorValidation')

router
  .get('/', verifyToken, userController.allUser)
  .get('/profile', verifyToken, userController.profile)
  // .get('/user-list', verifyToken, userController.getUserList)
  .patch('/location/:id', userController.updateLocation)
  .patch('/isonline/:id', userController.updateStatusOnline)
  .get('/:id', userController.detailUser)
  .patch('/:id', verifyToken, uploadFile, USER_UPDATE_PROFILE, userController.updateUser)
  // .delete('/:id', verifyToken, userController.deleteUser)

module.exports = router