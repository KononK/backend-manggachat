const queryHelper = require('../helpers/query')

const message = {

  getById: (id) => {
    return queryHelper('SELECT * FROM messages WHERE id = ?', id)
  },
  getMessageByRoom: (id, order, limit, offset, search, orderBy) => {
    return queryHelper(`SELECT messages.*, users.name, users.image as imageUser FROM messages INNER JOIN users ON messages.idUser = users.id WHERE messages.idRoom = ? ${search ? `AND messages.message LIKE '%${search}%'` : ''} ORDER BY ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`, id)
  },
  getTotalMessageByRoom: (id) => {
    return queryHelper('SELECT count(*) AS totalFound FROM messages WHERE idRoom = ?', id)
  },
  getTotalSearchMessageByRoom: (id, query) => {
    return queryHelper('SELECT count(*) AS totalFound FROM messages WHERE idRoom = ? AND message LIKE ?', [id, `%${query}%`])
  },
  sendMessage: (data) => {
    return queryHelper('INSERT INTO messages SET ?', data)
  },
  checkMessageUser: (id, idUser) => {
    return queryHelper('SELECT count(*) AS totalFound from messages WHERE id = ? AND idUser = ?', [id, idUser])
  },
  updateMessage: (data, id) => {
    return queryHelper('UPDATE messages SET ? WHERE id = ?', [data, id])
  }

}

module.exports = message