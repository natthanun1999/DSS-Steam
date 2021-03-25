const axios = require('axios')
const Promise = require('bluebird')
const Game = require('../models/game.js')

const getAllGames = (req, res) => {
    try {
        // http://127.0.0.1:9000/appids
        // http://api.steampowered.com/ISteamApps/GetAppList/v2/
        axios.get("http://127.0.0.1:9000/appids")
            .then(async (response) => {
                //let appids = getOnlyAppID(response.data.applist.apps)

                let appids = response.data.slice(0, 50) // Go up
                
                let gamesDetails = await getGamesDetail(appids)

                // Remove Key
                gamesDetails = gamesDetails.map((v, index) => {
                    return v[appids[index]]
                })

                gamesDetails = gamesDetails.filter((v) => 
                    v.success == true &&
                    v.data.type == "game" &&
                    v.data.release_date.coming_soon == false)
                
                let gamesReviews = await getGamesReview(gamesDetails)

                gamesReviews = Object.values(gamesReviews)

                try {
                    gamesDetails.forEach(async (v, index) => {
                        await addGame(v.data, gamesReviews[index])
                    })

                    res.status(201).json({ message: "Ok" })
                } catch (error) {
                    res.status(409).json({ message: error.message })
                }
                
                //res.status(201).json({ message: appids })
            })
            .catch((error) => res.status(400).json({ message: error }))
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const getOnlyAppID = (games) => {
    let appids = games.map((v) => {
        return v.appid
    })

    appids.sort((a, b) => b - a)

    return appids.slice(41000, 43000)
}

const getGamesDetail = async (appids) => {
    return await Promise.map(appids, appid => {
        let params = {
            appids: appid
        }

        let detail = axios.get("http://store.steampowered.com/api/appdetails", { params })
            .then((response) => {
                return response.data
            })
            .catch((error) => { return { message: error } })

        return detail
    }, { concurrency: 1 })
}

const getGamesReview = async (games) => {
    return await Promise.map(games, game => {
        let appid = game.data.steam_appid

        let params = {
            json: 1
        }

        let review = axios.get(`http://store.steampowered.com/appreviews/${appid}`, { params })
            .then((response) => {        
                return response.data
            })
            .catch((error) => { return { message: error } })

        return review
    }, { concurrency: 1 })
}

const addGame = async (detail, review) => {
    if (review.query_summary.review_score <= 0) return;

    const newGame = new Game({
        appid: detail.steam_appid,
        review_score: review.query_summary.review_score,
        detail: detail,
        review: review.query_summary
    })

    await newGame.save()
}

module.exports = {
    getAllGames
}