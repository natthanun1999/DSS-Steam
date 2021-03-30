const { Parser } = require('json2csv');

const mockupData = []

const mockup = (game) => {
	if (game.budget == 499) game.budget = "A"
	else if (game.budget == 1000) game.budget = "B"
	else game.budget = "C"

	if (game.age == 17) game.age = "A"
	else game.age = "B"

    mockupData.push(game)
}

const convertToCSV = () => {
    const fields = ['budget', 'age', 'category', 'tag',
					'review_score', 'diff', 'appid'];

    const json2csvParser = new Parser({ fields });

    const csv = json2csvParser.parse(mockupData);

    console.log(csv)
	console.log(mockupData.length)
}

module.exports = {
    mockup,
    convertToCSV
}