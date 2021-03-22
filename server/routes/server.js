const express = require('express')
const { getAllGames } = require('../controllers/server.js')

const route = express.Router()

route.get('/', getAllGames)

module.exports = route