const rout = require('express').Router()

const {newShortUrl, redirectUrl}  = require('../controler/urlControler')

rout.post('/shorten', newShortUrl)
rout.get("/:shortId", redirectUrl)

module.exports = rout