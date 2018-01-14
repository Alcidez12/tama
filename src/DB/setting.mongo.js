let mongoose = require('mongoose');
let settingsSchema = mongoose.Schema({
    accountId: String,
    type: String,
    id: String,
    data: {}
});
let settingsModel = mongoose.model('settings', settingsSchema);
module.exports = settingsModel;
