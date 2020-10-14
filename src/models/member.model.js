const queryHelper = require('../helpers/query')

const member = {

  addMember: (data) => {
    return queryHelper('INSERT INTO members SET ?', data)
  },
  checkMemberExist: (idRoom, idUser) => {
    return queryHelper(`SELECT count(*) AS totalFound FROM members WHERE idRoom = ? AND idUser = ?`, [idRoom, idUser])
  }

}

module.exports = member