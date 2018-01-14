let mongoose = require('mongoose');
let subsettingsSchema = mongoose.Schema({
    accountId: String,
    type: String,
    id: String,
    subType: String,
    subId: String,
    data: {}
});
let subsettingsModel = mongoose.model('subsettings', subsettingsSchema);
module.exports = subsettingsModel;
