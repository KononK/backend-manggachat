const helpers = require('../helpers/index')
const Message = require('../models/message.model')
const Room = require('../models/room.model')
const Member = require('../models/member.model')
const { v4: uuidv4 } = require('uuid');
const { response } = require('express')
let totalData
const message = {
  allMessage: (req, res) => {
    res.send('ok')
  },
  messageByRoom: (req, res) => {
    const id = req.params.id
    if(!id) return helpers.response(res, 400, null, 'Id room required', true)

    const limit = Number(req.query.limit) || 10
    const page = !req.query.page ? 1 : req.query.page
    const offset = (Number(page) === 0 ? 1 : page - 1) * limit
    const search = req.query.search || null
    const orderBy = req.query.orderby || 'id'
    const order = req.query.order || 'DESC'

    if (search) {
      Message.getTotalSearchMessageByRoom(id, search).then(response => {
        totalData = response[0].totalFound
      }).catch(err => console.log(err))
    } else {
      Message.getTotalMessageByRoom(id).then(response => {
        totalData = response[0].totalFound
      }).catch(err => console.log(err))
    }

    Message.getMessageByRoom(id, order, limit, offset, search, orderBy).then(response => {
      const newResponse = response
      const count = newResponse.length
      const total = totalData
      const links = helpers.links(limit, page, total, count)
      helpers.response(res, 200, newResponse, helpers.status.found, false, links)
    }).catch(err  => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  },
  sendMessage: async (req, res) => {
    const id = req.userId
    const {
      message,
      typeMessage,
      location,
      idRoom
    } = req.body
    if (!idRoom) return helpers.response(res, 400, null, 'Id room required', true)
    if (!typeMessage) return helpers.response(res, 400, null, 'Type Message required', true)
    if(typeMessage === 'message' && message === '') return helpers.response(res, 400, null, 'Message required', true)

    const dataMessage = {
      idRoom,
      idUser: id,
      message: message
    }
    if (req.file) {
      if (typeMessage === 'image') {
        dataMessage.type = 3
        dataMessage.image = `${process.env.BASE_URL}/${req.file.path}`
        if (!message) {
          dataMessage.message = 'Send image'
        }
      } else if (typeMessage === 'doc') {
        dataMessage.type = 4
        dataMessage.documentUrl = `${process.env.BASE_URL}/${req.file.path}`
        dataMessage.documentName = req.file.originalname
        if (!message) {
          dataMessage.message = 'Send doc'
        }
      }
    } else {
      if (typeMessage === 'message') {
        dataMessage.type = 1
      } else if (typeMessage === 'location') {
        dataMessage.type = 2
        dataMessage.location = location
        if (!message) {
          dataMessage.message = 'Share Location'
        }
      }
    }

    let isRoomAvailable
    let isMemberInRoom
    try{
      const resRoom = await Room.checkRoomByIdRoom(idRoom)
      const resMember = await Room.checkIsMemberInRoom(idRoom, id)
      isRoomAvailable = resRoom[0].totalFound
      isMemberInRoom = resMember[0].totalFound
    }catch(err) {
      return helpers.response(res, 400, null, err, true)
    }

    if(isRoomAvailable === 0){
      return helpers.response(res, 400, null, 'Room not found', true)
    }else{
      if(isMemberInRoom === 0){
        return helpers.response(res, 400, null, 'You are not a member in this room', true)
      }else{
        Message.sendMessage(dataMessage).then(response => {
          helpers.response(res, 200, dataMessage, helpers.status.insert)
        }).catch(err => {
          helpers.response(res, 400, null, err, true)
        })
      }
    }
  },
  deleteMessage: (req, res) => {
    const idMessage = req.params.id
    const id = req.userId
    Message.getById(idMessage).then(response => {
      Message.checkMessageUser(idMessage, id).then(responseCheck => {
        responseCheck = responseCheck[0].totalFound
        console.log(responseCheck)
        if(responseCheck === 0) {
          helpers.response(res, 400, null, 'You do not have access rights to delete this message', true)
        }else{
          Message.updateMessage({deletedAt: new Date()}, idMessage).then(responseDelete => {
            helpers.response(res, 200, responseDelete, helpers.status.delete)
          })
        }
      }).catch(err => {
        helpers.response(res, 400, null, err, true)
      })
    }).catch(err => {
      helpers.response(res, err.statusCode, null, err, true)
    })
  }
}

module.exports = message