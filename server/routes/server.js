const express = require('express')
const { getAllGames, modelTestCLI } = require('../controllers/server.js')

const route = express.Router()

route.get('/', getAllGames)
route.post('/CLI', modelTestCLI)

module.exports = route