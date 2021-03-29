const Game = require('../models/game.js')

const getAllGames = async (req, res) => {
    try {
        const content = await Game.find()

        res.status(200).json(content)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    getAllGames
}