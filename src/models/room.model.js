const queryHelper = require('../helpers/query')

const room = {

  all: () => {
    return queryHelper('SELECT * FROM rooms')
  },
  getRoomById: (id) => {
    return queryHelper('SELECT * FROM rooms WHERE id = ?', id)
  },
  getMyRoom: (id) => {
    return queryHelper(`
      SELECT members.*, a.name, a.type, a.description, b.message, b.createdAt, b.deletedAt, users.name as userName, users.id as sender, a.idSender, a.idReceiver
      FROM members 
      INNER JOIN (
        SELECT * FROM messages
        GROUP BY id DESC
      ) b ON members.idRoom = b.idRoom
      INNER JOIN rooms as a
        ON members.idRoom = a.idRoom 
      INNER JOIN users
        ON users.id = b.idUser
      WHERE members.idUser = ?  GROUP BY b.idRoom ORDER BY b.id DESC`, id)
  },
  getRoomByIdRoom: (idRoom) => {
    return queryHelper('SELECT rooms.*, messages.message FROM rooms INNER JOIN messages ON rooms.idRoom = messages.idRoom WHERE rooms.idRoom = ? ORDER BY messages.id DESC', idRoom)
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