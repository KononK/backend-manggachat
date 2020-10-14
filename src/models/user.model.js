const connection = require('../config/db.config')
const queryHelper = require('../helpers/query')

const user = {
  all: (id) => {
    return queryHelper(`
      SELECT
      id, name, email, username, location, image, phoneNumber, bio, statusAccount, statusOnline, createdAt, updatedAt
      FROM users WHERE id != ?`, id)
  },
  getAllUser: (id, order, limit, offset, search, orderBy) => {
    return queryHelper(
      `SELECT * FROM users WHERE statusAccount = 1 ${search ? `AND users.name LIKE '%${search}%'` : ''} ORDER BY ${orderBy} ${order} LIMIT ${limit} OFFSET ${offset}`,
    )
  },
  getTotal: (id) => {
    return queryHelper(`SELECT COUNT(*) AS total FROM users WHERE statusAccount = 1 AND users.id != ${id}`)
  },
  getTotalSearch: (id, query) => {
    return queryHelper(`SELECT * FROM users WHERE statusAccount = 1 AND users.id != ? AND name LIKE ?`, [id, `%${query}%`])
  },
  getUserById: (id) => {
    return queryHelper('SELECT * FROM users WHERE id = ?', id)
  },
  getUserByEmail: (email) => {
    return queryHelper('SELECT * FROM users WHERE email = ?', email)
  },
  updateUser: (dataUser, id) => {
    return queryHelper('UPDATE users SET ? WHERE id = ?', [dataUser, id])
  },
  deleteUser: (id) => {
    return queryHelper('DELETE FROM users WHERE id = ?', id)
  },
  signup: (newUser) => {
    return queryHelper('INSERT INTO users SET ?', newUser)
  },
  login: (email) => {
    return queryHelper('SELECT * FROM users WHERE email = ?', email)
  },
  checkEmailExist: (email) => {
    return queryHelper(
      'SELECT COUNT(*) AS totalFound FROM users WHERE email = ?',
      email,
    )
  },
  checkUsernameExist: (username) => {
    return queryHelper(
      'SELECT COUNT(*) AS totalFound FROM users WHERE username = ?', username
    )
  },
  checkPhoneNumberExist: (phoneNumber) => {
    return queryHelper(
      'SELECT COUNT(*) AS totalFound FROM users WHERE phoneNumber = ?', phoneNumber
    )
  }
}

module.exports = user