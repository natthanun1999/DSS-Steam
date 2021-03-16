const axios = require('axios')

const getAllGames = (req, res) => {
    try {
        axios.get("http://api.steampowered.com/ISteamApps/GetAppList/v2/")
            .then(async (response) => {
                let appids = getOnlyAppID(response.data.applist.apps)
                
                let gamesDetails = await getGameDetail(appids)

                gamesDetails = gamesDetails.filter((v) => v.success == true && v.data.type == "game" && v.data.release_date.coming_soon == false)

                res.status(200).json({ message: gamesDetails })
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

    return appids.slice(0, 2)
}

const getGameDetail = (appids) => {
    let gamesDetails = appids.map((appid) => {
        let params = {
            appids: appid
        }

        let detail = axios.get("http://store.steampowered.com/api/appdetails", { params })
            .then((response) => {
                return response.data
            })
            .catch((error) => { return { message: error } })

        return detail
    })

    return Promise.all(gamesDetails)
        .then(res => {
            // Remove Key
            return res.map((v, index) => {
                return v[appids[index]]
            })
        })
}

const getGameReview = (req, res) => {
    try {
        let { appid: appid } = req.params;

        let params = {
            json: 1
        }

        axios.get(`http://store.steampowered.com/appreviews/${appid}`, { params })
            .then((response) => {
                res.status(200).json({ message: response.data })
            })
            .catch((error) => res.status(400).json({ message: error }))
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = {
    getAllGames
}