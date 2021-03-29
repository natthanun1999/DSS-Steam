const { Parser } = require('json2csv');

const mockupData = []

const mockup = (budget, age, category, tag, choose) => {
	if (budget == 499) budget = "A"
	else if (budget == 1000) budget = "B"
	else budget = "C"

	if (age == 17) age = "A"
	else age = "B"

    let tmpData = {
		"budget": budget,
		"age": age,
		"category": category,
		"tag": tag,
		"choose": choose
	}

    mockupData.push(tmpData)
}

const convertToCSV = () => {
    const fields = ['budget', 'age',
                    'category', 'tag',
                    'choose'];

    const json2csvParser = new Parser({ fields });

    const csv = json2csvParser.parse(mockupData);

    console.log(csv)
	console.log(mockupData.length)
}

module.exports = {
    mockup,
    convertToCSV
}