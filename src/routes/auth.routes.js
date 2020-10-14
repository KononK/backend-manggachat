const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const { AUTH_REGISTER, AUTH_LOGIN, AUTH_REQ_RESET_PW, AUTH_RESET_PASSWORD } = require('../middlewares/errorValidation')


router
  .post('/login', AUTH_LOGIN, authController.login)
  .post('/register', AUTH_REGISTER, authController.register)
  .post('/activate-account', authController.activateAccount)
  .post('/req-reset-password', AUTH_REQ_RESET_PW, authController.reqResetPassword)
  .post('/verify-reset-password', authController.verifyResetPassword)
  .post('/reset-password', AUTH_RESET_PASSWORD, authController.resetPassword)

module.exports = router