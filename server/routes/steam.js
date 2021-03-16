const express = require('express')
const { getAllGames } = require('../controllers/steam.js')

const route = express.Router()

route.get('/', getAllGames)

module.exports = route