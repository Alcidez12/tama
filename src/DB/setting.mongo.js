const mongoose = require('mongoose')
const settingsSchema = mongoose.Schema({
  accountId: String,
  type: String,
  id: String,
  data: {}
})
const settingsModel = mongoose.model('settings', settingsSchema)
module.exports = settingsModel
