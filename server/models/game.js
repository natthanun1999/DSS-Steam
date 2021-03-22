const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    appid: String,
    review_score: Number,
    detail: Object,
    review: Object
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game