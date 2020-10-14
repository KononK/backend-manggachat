var multer = require('multer')
const path = require('path')
const helpers = require('../helpers')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const fileName = `${Math.random().toString(32).substring(2)}${path.extname(file.originalname)}`
    cb(null, fileName)
  }
})

const obj = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024
  }
})

const upload = multer(obj).single('file')

const uploadFile2 = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      if (error.code === 'LIMIT_FILE_SIZE') return helpers.response(res, 400, null, 'Max file size 4MB', true)
      return helpers.response(res, 400, null, error, true)
    } else {
      next()
    }
  })
}

module.exports = uploadFile2