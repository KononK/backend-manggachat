const queryHelper = require('../helpers/query')

const message = {

  getById: (id) => {
    return queryHelper('SELECT * FROM messages WHERE id = ?', id)
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