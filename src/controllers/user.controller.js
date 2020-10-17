const User = require('../models/user.model')
const helpers = require('../helpers/index')

const user = {
  allUser: (req, res) => {
    const id = req.userId
    console.log(id)
    User.all(id).then(response => {
      const result = response
      helpers.response(res, 200, result, helpers.status.found)

    }).catch(err => {
      helpers.response(res, 400, [], err, true)
    })
  },
  detailUser: (req, res) => {
    const id = req.params.id
    User.getUserById(id).then(response => {
      response = response[0]
      delete response.password
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, 400, [], err, true)
    })
  },
  profile: (req, res) => {
    const id = req.userId
    User.getUserById(id).then(response => {
      response = response[0]
      delete response.password
      helpers.response(res, 200, response, helpers.status.found)
    }).catch(err => {
      helpers.response(res, 400, [], err, true)
    })
  },
  updateStatusOnline: (req, res) => {
    const {status} = req.body
    const idUser = req.params.id
    if(Number(status) !== 1 && Number(status) !== 0) return helpers.response(res, 400, [], 'Status invalid', true)
    User.updateUser({statusOnline: status}, idUser).then(response => {
      helpers.response(res, 200, response, helpers.status.update)
    }).catch(err => {
      helpers.response(res, 400, [], err, true)
    })
  },
  updateLocation: (req, res) => {
    // "{\"lang\":232,\"lat\":122}"
    const id = req.params.id
    const { location } = req.body
    if(!location) return helpers.response(res, 400, [], 'Location required', true)
    User.updateUser({location}, id).then(response => {
      helpers.response(res, 200, response, helpers.status.update)
    }).catch(err => {
      helpers.response(res, 400, [], err, true)
    })
  },
  updateUser: (req, res) => {
    const { name, phoneNumber, username, bio } = req.body
    const id = req.params.id
    if (req.uploadErrorMessage) return helpers.response(res, 400, [], req.uploadErrorMessage, true)
    const newDataUser = {
      name,
      phoneNumber,
      bio,
      username: username.toLowerCase()
    }
    if (req.file) {
      newDataUser.image = `${process.env.BASE_URL}/${req.file.path}`
    }
    User.updateUser(newDataUser, id)
      .then(response => {
        helpers.response(res, 200, [], helpers.status.update)
      }).catch((err) => {
        helpers.response(res, 400, [], err, true)
      })
  }
}

module.exports = user