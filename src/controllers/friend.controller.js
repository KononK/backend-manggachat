const Friend = require('../models/friend.model')
const Member = require('../models/member.model')
const Message = require('../models/message.model')
const Room = require('../models/room.model')
const helpers = require('../helpers/index')
const { v4: uuidv4 } = require('uuid');

const friend = {

  getAllFriend: (req, res) => {
    Friend.allFriend().then(response => {
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, 400, null, err, true)
    })
  },
  getMyFriend: (req, res) => {
    const id = req.userId
    Friend.myFriend(id).then(response => {
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, 400, null, err, true)
    })
  },
  sendReqFriend: async (req, res) => {
    const id = req.userId
    const { idUser } = req.body
    const data1 = {
      idUser: id,
      idFriend: idUser,
      idSender: id,
      status: 0
    }
    const data2 = {
      idUser: idUser,
      idFriend: id,
      idSender: id,
      status: 0
    }
    try{
      await Friend.addFriend(data1)
      await Friend.addFriend(data2)
      helpers.response(res, 200, ['ok'], helpers.status.insert)
    }catch(err) {
      helpers.response(res, 400, null, err, true)
    }
  },
  accFriend: async (req, res) => {
    const id = req.userId
    const { idUser } = req.body
    try {
      await Friend.accFriend({status: 1}, id, idUser)
      await Friend.accFriend({status: 1}, idUser, id)
      const roomName = Math.random().toString(36).substring(7);
      const data = {
        idRoom: uuidv4(),
        name: roomName,
        idSender: idUser,
        idReceiver: id,
        type: 1
      }
      const response = await Room.addRoomPublic(data)
      console.log(response)
      const responseRoom = await Room.getRoomById(response.insertId)
      const detailRoom = responseRoom[0]
      const dataMember1 = {
        idRoom: detailRoom.idRoom,
        idUser: id,
        status: 1
      }
      const dataMember2 = {
        idRoom: detailRoom.idRoom,
        idUser: idUser,
        status: 1
      }
      await Member.addMember(dataMember1)
      await Member.addMember(dataMember2)
      const messageAcc = {
        message: `Friend request accepted`,
        type: 8,
        idRoom: detailRoom.idRoom,
        idUser: id
      }
      await Message.sendMessage(messageAcc)
      helpers.response(res, 200, ['ok'], helpers.status.update)
    }catch(err) {
      helpers.response(res, 400, null, err, true)
    }
  },
  refuseFriend: async (req, res) => {
    const id = req.userId
    const { idUser } = req.body
    
    try {
      await Friend.accFriend({status: 2}, id, idUser)
      await Friend.accFriend({status: 2}, idUser, id)
      helpers.response(res, 200, ['ok'], helpers.status.update)
    }catch(err) {
      helpers.response(res, 400, null, err, true)
    }
  },
  deleteRefuseFriend: async (req, res) => {
    const id = req.userId
    const idUser = req.params.id
    
    try {
      await Friend.deleteFriendReq(id, idUser)
      await Friend.deleteFriendReq(idUser, id)
      helpers.response(res, 200, ['ok'], helpers.status.delete)
    }catch(err) {
      helpers.response(res, 400, null, err, true)
    }
  }

}

module.exports = friend