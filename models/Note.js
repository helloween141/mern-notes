const {model, Types, Schema} = require('mongoose')
const moment = require('moment')

const schema = new Schema({
  title: {type: String, required: true},
  text: {type: String},
  date: {type: String, default: moment().format('DD.MM.YYYY')},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Note', schema) 