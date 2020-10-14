const helpers = require('./index')
module.exports = (res, data, callback) => {
  const checkEmpty = data.every(resultData => resultData.value !== '' && resultData.value !== undefined)
  if (!checkEmpty) {
    const errNull = data.map(val => !val.value ? `${val.name} required` : null).filter(v => v != null)
    return helpers.response(res, 400, null, errNull.join(', '), true)
  } else {
    const checkTypeData = data.map(val => {
      return {
        name: val.name,
        value: val.type === 'number' ? Number(val.value) : val.value,
        type: val.type
      }
    }).map(result => typeof result.value !== result.type || !result.value ? `Wrong ${result.name} data type` : null).filter(v => v != null)

    if (checkTypeData.length > 0) {
      helpers.response(res, 400, null, checkTypeData.join(', '), true)
    } else {
      return callback()
    }
  }
}