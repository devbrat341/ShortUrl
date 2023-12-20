
const {register, login, deleteUser}  = require('../controler/userContoler')
const rout = require('express').Router()
const {verifyUser} = require('../utils/verifyToken')


rout.post("/register", register)
rout.post("/login", login)

module.exports = rout