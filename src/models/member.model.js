const queryHelper = require('../helpers/query')

const member = {

  addMember: (data) => {
    return queryHelper('INSERT INTO members SET ?', data)
  },
  checkMemberExist: (idRoom, idUser) => {
    return queryHelper(`SELECT count(*) AS totalFound FROM members WHERE idRoom = ? AND idUser = ?`, [idRoom, idUser])
  },
  updateMember: (data, idRoom, idUser) => {
    return queryHelper('UPDATE members SET ? WHERE idRoom = ? AND idUser = ?', [data, idRoom, idUser])
  },
  getDetailNotif: (idRoom, idUser) => {
    return queryHelper('SELECT * FROM members WHERE idRoom = ? AND idUser = ?', [idRoom, idUser])
  }

}

module.exports = member