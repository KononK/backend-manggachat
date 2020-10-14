const queryHelper = require('../helpers/query')

const room = {

  all: () => {
    return queryHelper('SELECT * FROM rooms')
  },
  getRoomById: (id) => {
    return queryHelper('SELECT * FROM rooms WHERE id = ?', id)
  },
  getMyRoom: (id) => {
    return queryHelper('SELECT * FROM members WHERE idUser = ?', id)
  },
  getRoomByIdRoom: (idRoom) => {
    return queryHelper('SELECT * FROM rooms WHERE idRoom = ?', idRoom)
  },
  addRoomPublic: (data) => {
    return queryHelper('INSERT INTO rooms SET ?', data)
  },
  updateRoom: (data, id) => {
    return queryHelper('UPDATE rooms SET ? WHERE idRoom = ?', [data, id])
  },
  checkRoomName: (name) => {
    return queryHelper(
      'SELECT COUNT(*) AS totalFound FROM rooms WHERE name = ?', name
    )
  },
  checkRoomByIdRoom: (id) => {
    return queryHelper(
      'SELECT COUNT(*) AS totalFound FROM rooms WHERE idRoom = ?', id
    )
  },
  checkIsMemberInRoom: (idRoom, idUser) => {
    return queryHelper(
      'SELECT COUNT(*) AS totalFound FROM members WHERE idRoom = ? AND idUser = ?', [idRoom, idUser]
    )
  }

}

module.exports = room