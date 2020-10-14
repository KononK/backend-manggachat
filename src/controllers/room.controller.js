const helpers = require('../helpers')
const Room = require('../models/room.model')
const Member = require('../models/member.model')
const { v4: uuidv4 } = require('uuid');

const room = {

  allRoom: (req, res) => {
    Room.all().then(response => {
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  addPublicRoom: (req, res) => {
    const { name } = req.body
    const id = req.userId
    const data = {
      idRoom: uuidv4(),
      name: name,
      type: 2
    }
    Room.addRoomPublic(data).then(response => {
      Room.getRoomById(response.insertId).then(responseRoom => {
        responseRoom = responseRoom[0]
        const dataMember = {
          idRoom: responseRoom.idRoom,
          idUser: id,
          status: 1
        }
        Member.addMember(dataMember).then(responseMember => {
          helpers.response(res, 200, responseRoom, helpers.status.insert)
        }).catch(err => {
          helpers.response(res, err.statusCode, null, err, true)
        })
      }).catch(err => {
        helpers.response(res, err.statusCode, null, err, true)
      })
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  detailRoom: (req, res) => {
    const id = req.params.id
    Room.getRoomByIdRoom(id).then(response => {
      response = response[0]
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  updateRoom: (req, res) => {
    const id = req.params.id
    const { name } = req.body
    Room.updateRoom({name: name}, id).then(response => {
      helpers.response(res, 200, response, helpers.status.update)
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  inviteUser: (req, res) => {
    const { idUser, idRoom } = req.body
    const dataMember = {
      idRoom: idRoom,
      idUser: idUser,
      status: 2
    }
    Member.addMember(dataMember).then(responseMember => {
      helpers.response(res, 200, responseMember, helpers.status.insert)
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  myRoom: (req, res) => {
    const id = req.userId
    Room.getMyRoom(id).then(response => {
      response
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  

}

module.exports = room