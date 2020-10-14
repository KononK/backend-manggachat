const Friend = require('../models/friend.model')
const helpers = require('../helpers/index')

const friend = {

  getAllFriend: (req, res) => {
    Friend.allFriend().then(response => {
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  getMyFriend: (req, res) => {
    const id = req.userId
    Friend.myFriend(id).then(response => {
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
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
      helpers.response(res, err.statusCode, null, err, true)
    }
  },
  accFriend: async (req, res) => {
    const id = req.userId
    const { idUser } = req.body
    
    try {
      await Friend.accFriend({status: 1}, id, idUser)
      await Friend.accFriend({status: 1}, idUser, id)
      helpers.response(res, 200, ['ok'], helpers.status.update)
    }catch(err) {
      helpers.response(res, err.statusCode, null, err, true)
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
      helpers.response(res, err.statusCode, null, err, true)
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
      helpers.response(res, err.statusCode, null, err, true)
    }
  }

}

module.exports = friend