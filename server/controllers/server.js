const Game = require('../models/game.js')
const CLI = require('../helpers/cli.js')
const CSV = require('../helpers/ReadCSV.js')

const getAllGames = async (req, res) => {
    try {
        const content = await Game.find()

        res.status(200).json(content)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const modelTestCLI = (req, res) => {
    let params = req.body.params;

    try {
        CLI.modelTestCLI(params, (predict) => {
            res.status(200).json(predict)
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const getMostPick = (req, res) => {
    let params = req.body.params;

    try {
        res.status(200).json(CSV.getMostPick(params))
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    getAllGames,
    modelTestCLI,
    getMostPick
}