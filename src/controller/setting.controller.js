const SettingModel = require('../DB/setting.mongo')
const SubsettingModel = require('../DB/subsetting.mongo')

class SettingsController {
  async getSetting (settingType, settingId, accountId) {
    return SettingModel.findOne({type: settingType, id: settingId, accountId}, {_id: 0, __v: -0})
  }

  async updateSetting (settingType, settingId, accountId, settingData) {
    const setting = await this.getSetting(settingType, settingId, accountId)
    if (setting) {
      await this._updateSetting(settingType, settingId, accountId, settingData)
      setting.data = settingData
      return setting
    }
    return this._createSetting(settingType, settingId, accountId, settingData)
  }

  async _createSetting (settingType, settingId, accountId, settingData) {
    const setting = new SettingModel({
      id: settingId,
      type: settingType,
      accountId,
      data: settingData
    })
    await setting.save()
    return setting
  }

  async _updateSetting (settingType, settingId, accountId, settingData) {
    return SettingModel.update({id: settingId, type: settingType, accountId}, {$set: {data: settingData}})
  }

  async deleteSetting (settingType, settingId, accountId) {
    const setting = await this.getSetting(settingType, settingId, accountId)
    if (setting) {
      await this._deleteSetting(settingType, settingId, accountId)
      return setting
    }
    return null
  }

  async _deleteSetting (settingType, settingId, accountId) {
    return SettingModel.remove({id: settingId, type: settingType, accountId})
  }

  async getSubsettings (settingType, settingId, accountId, subType) {
    return SubsettingModel.find({type: settingType, id: settingId, accountId, subType}, {_id: 0, __v: 0})
  }

  async getSubsetting (settingType, settingId, accountId, subType, subId) {
    return SubsettingModel.findOne({type: settingType, id: settingId, accountId, subType, subId}, {_id: 0, __v: 0})
  }

  async updateSubsetting (settingType, settingId, accountId, subType, subId, data) {
    const subsetting = await this.getSubsetting(settingType, settingId, accountId, subType, subId)
    if (subsetting) {
      await this._updateSubsetting(settingType, settingId, accountId, subType, subId, data)
      subsetting.data = data
      return subsetting
    }
    return this._createSubsetting(settingType, settingId, accountId, subType, subId, data)
  }

  async _updateSubsetting (settingType, settingId, accountId, subType, subId, data) {
    return SubsettingModel.update({type: settingType, id: settingId, accountId, subType, subId}, {$set: {data}})
  }

  async _createSubsetting (settingType, settingId, accountId, subType, subId, data) {
    const setting = new SubsettingModel({
      id: settingId,
      type: settingType,
      accountId,
      data,
      subId,
      subType
    })
    await setting.save()
    return setting
  }

  async deleteSubsetting (settingType, settingId, accountId, subType, subId) {
    const subsetting = await this.getSubsetting(settingType, settingId, accountId, subType, subId)
    if (subsetting) {
      await SubsettingModel.remove({type: settingType, id: settingId, accountId, subType, subId})
      return subsetting
    }
    return null
  }
}

module.exports = new SettingsController()
