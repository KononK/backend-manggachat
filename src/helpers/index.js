require('dotenv').config()
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const mustache = require('mustache');

module.exports = {
  response: (res, status, results, message, error, links) => {
    const resJson = {}
    if (links) {
      resJson.total = links.total
      resJson.per_page = links.per_page
      resJson.count = links.count
      resJson.current_page = links.current_page
      resJson.total_pages = links.total_pages
      resJson._links = links._links
    }
    resJson.success = !error
    resJson.status_code = status
    if (error) {
      resJson.error = error || null
    }
    if (message) {
      resJson.message = message
    }
    resJson.data = results

    return res.status(status).json(resJson)
  },
  status: {
    found: 'Data found',
    insert: 'Data successfully added',
    update: 'Data successfully updated',
    delete: 'Data successfully deleted'
  },
  links: (limit, start, total, count) => {
    const last = Math.ceil(total / limit)
    const numStart = Number(start) === 0 ? 1 : Number(start)
    const result = {
      per_page: limit,
      count: count,
      total: total,
      current_page: numStart,
      total_pages: last,
      _links: {
        self: numStart,
        next: count < limit || numStart === last ? null : numStart + 1,
        prev: numStart === 0 || numStart === 1 ? null : numStart - 1,
        first: numStart === 1 ? null : 1,
        last: numStart === last ? null : last
      }
    }
    return result
  },
  errors: {
    notFound: {
      code: 'ERR_NOT_FOUND',
      statusCode: 404,
      sqlMessage: 'Data Not Found'
    },
    checkStatusCode: (errorCode) => {
      const errorCodes = Number(errorCode)
      if (errorCodes === 1048 || errorCodes === 1366) {
        return 400
      } else if (errorCodes === 1146 || errorCodes === 1054 || errorCodes === 1051) {
        return 500
      } else {
        return 400
      }
    }
  },
  transporter: async (message, email, subject, type, cb) => {
    let pathJoin
    let template
    if(type === 'signup'){
      pathJoin = path.join(__dirname, './template_signup.html')
      template = fs.readFileSync(pathJoin, 'utf8')
    }else {
      pathJoin = path.join(__dirname, './template_password.html')
      template = fs.readFileSync(pathJoin, 'utf8')
    }

    const transporter = await nodemailer.createTransport({
      host: 'mail.juna.masuk.web.id',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASS_USER
      }
    });

    const mailinfo = {
      from: '"Mangga Chat" <manggachat@juna.masuk.web.id>',
      to: email,
      subject: subject,
      html: mustache.render(template, {link: message})
    }

    transporter.sendMail(mailinfo, (error, info) => {
      if (error) {
        console.log(error)
        this.response(res, [], 400, null, null, ['email failed to send'])
      } else {
        return cb()
      }
    })
  },
  mailInfo: () => {

  },
  formatNumber: (number) => {
    const reverse = number.toString().split('').reverse().join('')
    const ribuan = reverse.match(/\d{1,3}/g);
    const result = ribuan.join('.').split('').reverse().join('');
    return result
  }
}