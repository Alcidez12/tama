'use strict'
const BaseRouter = require('@weeb_services/wapi-core').BaseRouter
const HTTPCodes = require('@weeb_services/wapi-core').Constants.HTTPCodes
const settingController = require('../controller/setting.controller')
const winston = require('winston')

class SettingsRouter extends BaseRouter {
  constructor () {
    super()
    this.get('/:type/:id', async (req) => {
      try {
        const setting = await settingController.getSetting(req.params.type, req.params.id, req.account.id)
        if (!setting) {
          return {status: HTTPCodes.NOT_FOUND}
        }
        return {status: HTTPCodes.OK, setting}
      } catch (e) {
        winston.error(e)
        return {status: HTTPCodes.INTERNAL_SERVER_ERROR}
      }
    })
    this.post('/:type/:id', async (req) => {
      try {
        if (!req.body) {
          return {status: HTTPCodes.BAD_REQUEST, message: 'Missing body'}
        }
        const setting = await settingController.updateSetting(req.params.type, req.params.id, req.account.id, req.body)
        return {status: HTTPCodes.OK, setting}
      } catch (e) {
        winston.error(e)
        return {status: HTTPCodes.INTERNAL_SERVER_ERROR}
      }
    })
    this.delete('/:type/:id', async (req) => {
      try {
        const setting = await settingController.deleteSetting(req.params.type, req.params.id, req.account.id)
        if (!setting) {
          return {status: HTTPCodes.NOT_FOUND}
        }
        return {status: HTTPCodes.OK, message: 'Setting deleted', setting}
      } catch (e) {
        winston.error(e)
        return {status: HTTPCodes.INTERNAL_SERVER_ERROR}
      }
    })
    this.get('/:type/:id/:subtype', async (req) => {
      try {
        const subsettings = await settingController.getSubsettings(req.params.type, req.params.id, req.account.id, req.params.subtype)
        if (!subsettings || subsettings.length === 0) {
          return {status: HTTPCodes.NOT_FOUND}
        }
        return {status: HTTPCodes.OK, subsettings}
      } catch (e) {
        winston.error(e)
        return {status: HTTPCodes.INTERNAL_SERVER_ERROR}
      }
    })
    this.get('/:type/:id/:subtype/:subid', async (req) => {
      try {
        const subsetting = await settingController.getSubsetting(req.params.type, req.params.id, req.account.id, req.params.subtype, req.params.subid)
        if (!subsetting) {
          return {status: HTTPCodes.NOT_FOUND}
        }
        return {status: HTTPCodes.OK, subsetting}
      } catch (e) {
        winston.error(e)
        return {status: HTTPCodes.INTERNAL_SERVER_ERROR}
      }
    })
    this.post('/:type/:id/:subtype/:subid', async (req) => {
      try {
        if (!req.body) {
          return {status: HTTPCodes.BAD_REQUEST, message: 'Missing body'}
        }
        const subsetting = await settingController.updateSubsetting(req.params.type, req.params.id, req.account.id, req.params.subtype, req.params.subid, req.body)
        return {status: HTTPCodes.OK, subsetting}
      } catch (e) {
        winston.error(e)
        return {status: HTTPCodes.INTERNAL_SERVER_ERROR}
      }
    })
    this.delete('/:type/:id/:subtype/:subid', async (req) => {
      try {
        const subsetting = await settingController.deleteSubsetting(req.params.type, req.params.id, req.account.id, req.params.subtype, req.params.subid)
        if (!subsetting) {
          return {status: HTTPCodes.NOT_FOUND}
        }
        return {status: HTTPCodes.OK, message: 'Subsetting deleted', subsetting}
      } catch (e) {
        winston.error(e)
        return {status: HTTPCodes.INTERNAL_SERVER_ERROR}
      }
    })
  }
}

module.exports = SettingsRouter
