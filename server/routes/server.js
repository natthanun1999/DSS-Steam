const express = require('express')
const { getAllGames, modelTestCLI, getMostPick } = require('../controllers/server.js')

const route = express.Router()

route.get('/', getAllGames)
route.post('/CLI', modelTestCLI)
route.post('/Most', getMostPick)

module.exports = route