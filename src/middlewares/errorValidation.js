const errorHandling = require('../helpers/errorHandling')
const User = require('../models/user.model')
const Room = require('../models/room.model')
const Friend = require('../models/friend.model')
const helpers = require('../helpers/index.js')
const member = require('../models/member.model')

const errorValidation = {

  AUTH_REGISTER: (req, res, next) => {
    const { name, email, password } = req.body
    const newCheck = [
      {
        name: 'Name',
        value: name,
        type: 'string',
      },
      {
        name: 'Email',
        value: email,
        type: 'string',
      },
      {
        name: 'Password',
        value: password,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, async () => {
      const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email,
      )
      if (!checkEmail) {
        return helpers.response(res, 400, null, 'Invalid email', true)
      } else if (password.length < 6) {
        return helpers.response(res, 400, null, 'Password min 6 character', true)
      } else {
        let isEmailExist
        try {
          const resEmail = await User.checkEmailExist(email.toLowerCase())
          isEmailExist = resEmail[0].totalFound
        } catch (error) {
          return helpers.response(res, error.statusCode, null, error, true)
        }
        if (isEmailExist > 0) {
          return helpers.response(res, 400, null, 'Email already exist', true)
        } else {
          next()
        }
      }
    })
  },
  AUTH_LOGIN: (req, res, next) => {
    const { email, password } = req.body
    const newCheck = [
      {
        name: 'Email',
        value: email,
        type: 'string',
      },
      {
        name: 'Password',
        value: password,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, () => {
      const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email,
      )
      if (!checkEmail) {
        return helpers.response(res, 400, null, 'Invalid email', true)
      } else {
        next()
      }
    })
  },
  AUTH_REQ_RESET_PW: (req, res, next) => {
    const { email } = req.body
    const newCheck = [
      {
        name: 'Email',
        value: email,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, async () => {
      const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email,
      )
      if (!checkEmail) {
        return helpers.response(res, 400, null, 'Invalid email', true)
      }else {
        let isEmailExist
        try {
          const resEmail = await User.checkEmailExist(email.toLowerCase())
          isEmailExist = resEmail[0].totalFound
        } catch (error) {
          return helpers.response(res, error.statusCode, null, error, true)
        }
        if (isEmailExist === 0) {
          return helpers.response(res, 400, null, 'Email not found', true)
        } else {
          next()
        }
      }
    })
  },
  AUTH_RESET_PASSWORD: (req, res, next) => {
    const {
      password,
      confirmPassword
    } = req.body
    const newCheck = [{
        name: 'Password',
        value: password,
        type: 'string',
      },
      {
        name: 'Confirmation Password',
        value: confirmPassword,
        type: 'string',
      }
    ]
    errorHandling(res, newCheck, async () => {
      if (password.length < 6) {
        return helpers.response(res, 400, [], 'New password min 6 character', true)
      } else if (confirmPassword.length < 6) {
        return helpers.response(res, 400, [], 'Confirmation password min 6 character', true)
      } else if (password !== confirmPassword) {
        return helpers.response(res, 400, [], 'New password not match with confirmation password', true)
      } else {
        next()
      }
    })
  },
  USER_UPDATE_PROFILE: (req, res, next) => {
    const { name, phoneNumber, username, bio } = req.body
    const newCheck = [
      {
        name: 'Name',
        value: name,
        type: 'string',
      },
      {
        name: 'Phone Number',
        value: phoneNumber,
        type: 'string',
      },
      {
        name: 'Username',
        value: username,
        type: 'string',
      },
      {
        name: 'Bio',
        value: bio,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, async () => {
      const id = req.params.id
      if (username.split(' ').length > 1) {
        return helpers.response(
          res,
          400,
          null,
          'Username cannot contain spaces',
          true,
        )
      } else {
        User.getUserById(id).then(async response => {
          response = response[0]
          if(response.username !== username && response.phoneNumber !== phoneNumber){
            let checkUsernameExist
            let checkPhoneNumberExist
            try{
              const responseUsername = await User.checkUsernameExist(username)
              const responsePhone = await User.checkPhoneNumberExist(phoneNumber)
              checkUsernameExist = responseUsername[0].totalFound
              checkPhoneNumberExist = responsePhone[0].totalFound
            }catch(err) {
              return helpers.response(res, 400, [], err, true)
            }
            if(checkUsernameExist > 0){
              return helpers.response(res, 400, [], 'Username already exist', true)
            }else if(checkPhoneNumberExist > 0){
              return helpers.response(res, 400, [], 'Phone number already exist', true)
            }else{
              next()
            }
          }else {
            next()
          }
        }).catch(err => {
          return helpers.response(res, err.statusCode, [], err, true)
        })
      }
    })
  },
  ROOM_ADD_PUBLIC: (req, res, next) => {
    const { name } = req.body
    const newCheck = [
      {
        name: 'Name',
        value: name,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, async () => {
      let isRoomNameExist
      try {
        const resRooom = await Room.checkRoomName(name)
        isRoomNameExist = resRooom[0].totalFound
      } catch (error) {
        return helpers.response(res, error.statusCode, null, error, true)
      }
      if (isRoomNameExist > 0) {
        return helpers.response(res, 400, null, 'Room name already exist', true)
      } else {
        next()
      }
    })
  },
  ROOM_UPDATE_PUBLIC: (req, res, next) => {
    const { name } = req.body
    const newCheck = [
      {
        name: 'Name',
        value: name,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, async () => {
      const id = req.params.id
      Room.getRoomByIdRoom(id).then(async response => {
        response = response[0]
        if(response.name === name) {
          next()
        }else{
          let isRoomNameExist
          try {
            const resRooom = await Room.checkRoomName(name)
            isRoomNameExist = resRooom[0].totalFound
          } catch (error) {
            return helpers.response(res, error.statusCode, null, error, true)
          }
          if (isRoomNameExist > 0) {
            return helpers.response(res, 400, null, 'Room name already exist', true)
          } else {
            next()
          }
        }
      }).catch(err => {
        return helpers.response(res, err.statusCode, null, err, true)
      })
      
    })
  },
  ROOM_INVITE_USER: (req, res, next) => {
    const { idUser, idRoom } = req.body
    const newCheck = [
      {
        name: 'Id User',
        value: idUser,
        type: 'string',
      },
      {
        name: 'Id Room',
        value: idRoom,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, () => {
      User.getUserById(idUser).then(response => {
        response = response[0]
        if(response.statusAccount === 0) {
          return helpers.response(res, 400, null, 'User account has not been activated', true)
        }else{
          Room.getRoomByIdRoom(idRoom).then( async responseRoom => {
            responseRoom = responseRoom[0]
            if(responseRoom.type === 1) {
              return helpers.response(res, 400, null, 'This room is private', true)
            }else{
              let isUserExist
              try {
                const resMember = await member.checkMemberExist(idRoom, idUser)
                isUserExist = resMember[0].totalFound
              } catch (error) {
                console.log('sini')
                return helpers.response(res, error.statusCode, null, error, true)
              }
              if (isUserExist > 0) {
                return helpers.response(res, 400, null, 'The user has already joined this room', true)
              } else {
                next()
              }
            }
          })
        }
      }).catch(err => {
        return helpers.response(res, err.statusCode, null, 'User Not Found', true)
      })
      
    })
  },
  FRIEND_SEND_REQ_FRIEND: (req, res, next) => {
    const { idUser } = req.body
    const id = req.userId
    const newCheck = [
      {
        name: 'Id User',
        value: idUser,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, () => {
      if(idUser === id){
        return helpers.response(res, 400, null, 'Id user and Id you must diferent', true)
      }else{
        User.getUserById(idUser).then(async response => {
          response = response[0]
          if(response.statusAccount === 0) {
            return helpers.response(res, 400, null, 'User account has not been activated', true)
          }else{
            let checkFriendExist
            let checkFriendAccExist
            let checkFriendRejectExist
            try {
              const resCheckFriendExist = await Friend.checkFriendExist(id, idUser)
              const resCheckFriendAccExist = await Friend.checkFriendAccExist(id, idUser)
              const resCheckFriendRejectExist = await Friend.checkFriendRejectExist(id, idUser)
              checkFriendExist = resCheckFriendExist[0].totalFound
              checkFriendAccExist = resCheckFriendAccExist[0].totalFound
              checkFriendRejectExist = resCheckFriendRejectExist[0].totalFound
            } catch (error) {
              return helpers.response(res, 400, null, error, true)
            }
            if (checkFriendExist > 0) {
              return helpers.response(res, 400, null, 'Friend request has not been accepted', true)
            } else if (checkFriendAccExist > 0) {
              return helpers.response(res, 400, null, 'You are already friends', true)
            } else if (checkFriendRejectExist > 0) {
              return helpers.response(res, 400, null, 'Friend request denied', true)
            } else {
              next()
            }
          }
        }).catch(err => {
          return helpers.response(res, err.statusCode, null, 'User Not Found', true)
        })
      }
    })
  },
  FRIEND_ACC_REQ_FRIEND: (req, res, next) => {
    const { idUser } = req.body
    const id = req.userId
    const newCheck = [
      {
        name: 'Id User',
        value: idUser,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, () => {
      if(idUser === id){
        return helpers.response(res, 400, null, 'Id user and Id you must diferent', true)
      }else{
        User.getUserById(idUser).then(async response => {
          response = response[0]
          if(response.statusAccount === 0) {
            return helpers.response(res, 400, null, 'User account has not been activated', true)
          }else{
            let checkFriendExist
            let checkFriendAccExist
            let checkFriendRejectExist
            let checkAcc
            try {
              const resCheckAcc = await Friend.checkAccFriend(id, idUser, id)
              const resCheckFriendExist = await Friend.checkFriendExist(id, idUser)
              const resCheckFriendAccExist = await Friend.checkFriendAccExist(id, idUser)
              const resCheckFriendRejectExist = await Friend.checkFriendRejectExist(id, idUser)
              console.log(resCheckAcc)
              checkFriendExist = resCheckFriendExist[0].totalFound
              checkFriendAccExist = resCheckFriendAccExist[0].totalFound
              checkFriendRejectExist = resCheckFriendRejectExist[0].totalFound
              checkAcc = resCheckAcc[0].totalFound
            } catch (error) {
              return helpers.response(res, 400, null, error, true)
            }
            if (checkFriendAccExist > 0) {
              return helpers.response(res, 400, null, 'You are already friends', true)
            } else if (checkFriendRejectExist > 0) {
              return helpers.response(res, 400, null, 'Friend request denied', true)
            } else if (checkAcc > 0) {
              return helpers.response(res, 400, null, 'You do not have access rights', true)
            } else if (checkFriendExist === 0) {
              return helpers.response(res, 400, null, 'Friend request not found', true)
            }  else {
              next()
            }
          }
        }).catch(err => {
          return helpers.response(res, err.statusCode, null, 'User Not Found', true)
        })
      }
    })
  },
  FRIEND_REFUSE_REQ_FRIEND: (req, res, next) => {
    const { idUser } = req.body
    const id = req.userId
    const newCheck = [
      {
        name: 'Id User',
        value: idUser,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, () => {
      if(idUser === id){
        return helpers.response(res, 400, null, 'Id user and Id you must diferent', true)
      }else{
        User.getUserById(idUser).then(async response => {
          response = response[0]
          if(response.statusAccount === 0) {
            return helpers.response(res, 400, null, 'User account has not been activated', true)
          }else{
            let checkFriendExist
            let checkFriendAccExist
            let checkFriendRejectExist
            let checkAcc
            try {
              const resCheckAcc = await Friend.checkAccFriend(id, idUser, id)
              const resCheckFriendExist = await Friend.checkFriendExist(id, idUser)
              const resCheckFriendAccExist = await Friend.checkFriendAccExist(id, idUser)
              const resCheckFriendRejectExist = await Friend.checkFriendRejectExist(id, idUser)
              console.log(resCheckAcc)
              checkFriendExist = resCheckFriendExist[0].totalFound
              checkFriendAccExist = resCheckFriendAccExist[0].totalFound
              checkFriendRejectExist = resCheckFriendRejectExist[0].totalFound
              checkAcc = resCheckAcc[0].totalFound
            } catch (error) {
              return helpers.response(res, 400, null, error, true)
            }
            if (checkFriendAccExist > 0) {
              return helpers.response(res, 400, null, 'You are already friends', true)
            } else if (checkFriendRejectExist > 0) {
              return helpers.response(res, 400, null, 'Friend request denied', true)
            } else if (checkAcc > 0) {
              return helpers.response(res, 400, null, 'You do not have access rights', true)
            } else if (checkFriendExist === 0) {
              return helpers.response(res, 400, null, 'Friend request not found', true)
            }  else {
              next()
            }
          }
        }).catch(err => {
          return helpers.response(res, err.statusCode, null, 'User Not Found', true)
        })
      }
    })
  },
  FRIEND_DELETE_REQ_FRIEND: (req, res, next) => {
    const idUser = req.params.id
    const id = req.userId
    const newCheck = [
      {
        name: 'Id User',
        value: idUser,
        type: 'string',
      }
    ]

    errorHandling(res, newCheck, () => {
      if(idUser === id){
        return helpers.response(res, 400, null, 'Id user and Id you must diferent', true)
      }else{
        User.getUserById(idUser).then(async response => {
          response = response[0]
          if(response.statusAccount === 0) {
            return helpers.response(res, 400, null, 'User account has not been activated', true)
          }else{
            let checkFriendExist
            let checkFriendAccExist
            let checkFriendRejectExist
            let checkDelete
            try {
              const resCheckDelete = await Friend.checkDeleteFriend(id, idUser, id)
              const resCheckFriendExist = await Friend.checkFriendExist(id, idUser)
              const resCheckFriendAccExist = await Friend.checkFriendAccExist(id, idUser)
              const resCheckFriendRejectExist = await Friend.checkFriendRejectExist(id, idUser)
              checkFriendAccExist = resCheckFriendAccExist[0].totalFound
              checkFriendRejectExist = resCheckFriendRejectExist[0].totalFound
              checkFriendExist = resCheckFriendExist[0].totalFound
              checkDelete = resCheckDelete[0].totalFound
              console.log(resCheckDelete)
            } catch (error) {
              return helpers.response(res, 400, null, error, true)
            }
            if (checkFriendAccExist > 0) {
              return helpers.response(res, 400, null, 'You are already friends', true)
            }else if (checkFriendExist > 0) {
              return helpers.response(res, 400, null, 'Request friend pending', true)
            }else if (checkDelete === 0) {
              return helpers.response(res, 400, null, 'You do not have access rights', true)
            } else {
              next()
            }
          }
        }).catch(err => {
          return helpers.response(res, err.statusCode, null, 'User Not Found', true)
        })
      }
    })
  },

}

module.exports = errorValidation