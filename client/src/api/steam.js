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

const modelTestCLI = async (userInput) => {
    if (userInput.budget == 499) userInput.budget = "A"
	else if (userInput.budget == 1000) userInput.budget = "B"
	else userInput.budget = "C"

	if (userInput.age == 17) userInput.age = "A"
	else userInput.age = "B"

    const params = {
        budget: userInput.budget,
        age: userInput.age,
        category: userInput.category,
        tag: userInput.tag,
        review_score: userInput.review_score,
        diff: userInput.diff
    }

    try {
        const result = await axios.post(`${BASE_URL}/CLI`, { params })

        return result.data
    } catch (error) {
        return error.message
    }
}

const getMostPick = async (userInput) => {
    if (userInput.budget == 499) userInput.budget = "A"
	else if (userInput.budget == 1000) userInput.budget = "B"
	else userInput.budget = "C"

	if (userInput.age == 17) userInput.age = "A"
	else userInput.age = "B"

    const params = {
        budget: userInput.budget,
        age: userInput.age,
        category: userInput.category,
        tag: userInput.tag
    }

    try {
        const result = await axios.post(`${BASE_URL}/Most`, { params })

        return result.data
    } catch (error) {
        return error.message
    }
}

module.exports = {
    getAllGames,
    modelTestCLI,
    getMostPick
}