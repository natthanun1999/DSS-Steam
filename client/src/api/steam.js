let axios = require('axios')
let BASE_URL = "http://localhost:3000/steam"

const getAllGames = async () => {
    try {
        const result = await axios.get(BASE_URL)

        return result.data
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getAllGames
}