const queryHelper = require('../helpers/query')

const friend = {

  allFriend: () => {
    return queryHelper('SELECT * FROM friends')
  },
  myFriend: (id) => {
    return queryHelper('SELECT friends.*, users.name as friendName, users.image, users.location, users.phoneNumber, users.statusOnline FROM friends INNER JOIN users ON friends.idFriend = users.id WHERE idUser = ?', id)
  },
  addFriend: (data) => {
    return queryHelper('INSERT INTO friends SET ?', data)
  },
  accFriend: (data, idUser, idFriend) => {
    return queryHelper('UPDATE friends SET ? WHERE idUser = ? AND idFriend = ?', [data, idUser, idFriend])
  },
  deleteFriendReq: (idUser, idFriend) => {
    return queryHelper('DELETE FROM friends WHERE idUser = ? AND idFriend = ?', [idUser, idFriend])
  },
  checkAccFriend: (idMe, idFriend, idSender) => {
    return queryHelper('SELECT count(*) as totalFound FROM friends WHERE idUser = ? AND idFriend = ? AND idSender = ? AND status = 0', [idMe, idFriend, idSender])
  },
  checkDeleteFriend: (idMe, idFriend, idSender) => {
    return queryHelper('SELECT count(*) as totalFound FROM friends WHERE idUser = ? AND idFriend = ? AND idSender = ? AND status = 2', [idMe, idFriend, idSender])
  },
  checkFriendExist: (idMe, idFriend) => {
    return queryHelper('SELECT count(*) as totalFound FROM friends WHERE idUser = ? AND idFriend = ? AND status = 0', [idMe,idFriend])
  },
  checkFriendAccExist: (idMe, idFriend) => {
    return queryHelper('SELECT count(*) as totalFound FROM friends WHERE idUser = ? AND idFriend = ? AND status = 1', [idMe,idFriend])
  },
  checkFriendRejectExist: (idMe, idFriend) => {
    return queryHelper('SELECT count(*) as totalFound FROM friends WHERE idUser = ? AND idFriend = ? AND status = 2', [idMe,idFriend])
  }

}

module.exports = friend