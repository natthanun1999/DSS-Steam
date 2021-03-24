const { Parser } = require('json2csv');

const mockupData = []

const mockup = (budget, age, categories, tags, gameIndex) => {
    let tmpData = {
		"budget": budget,
		"age": age,
		"categories": {
			"SinglePlayer"  : (categories.includes('Single-player')) ? "Yes" : "No",
			"MultiPlayer"   : (categories.includes('Multi-player')) ? "Yes" : "No",
			"Coop"          : (categories.includes('Co-op')) ? "Yes" : "No",
		},
		"tags": {
			"Action"        : (tags.includes('Action')) ? "Yes" : "No",
			"Adventure"     : (tags.includes('Adventure')) ? "Yes" : "No",
			"Casual"        : (tags.includes('Casual')) ? "Yes" : "No",
			"Experimental"  : (tags.includes('Experimental')) ? "Yes" : "No",
			"Puzzel"        : (tags.includes('Puzzel')) ? "Yes" : "No",
			"Racing"        : (tags.includes('Racing')) ? "Yes" : "No",
			"RPG"           : (tags.includes('RPG')) ? "Yes" : "No",
			"Simulation"    : (tags.includes('Simulation')) ? "Yes" : "No",
			"Sports"        : (tags.includes('Sports')) ? "Yes" : "No",
			"Strategy"      : (tags.includes('Strategy')) ? "Yes" : "No",
			"Tabletop"      : (tags.includes('Tabletop')) ? "Yes" : "No",
			"Indie"         : (tags.includes('Indie')) ? "Yes" : "No",
        },
		"gameIndex": gameIndex
	}

    mockupData.push(tmpData)
}

const convertToCSV = () => {
    const fields = ['budget', 'age',
                    'categories.SinglePlayer', 'categories.MultiPlayer', 'categories.Coop',
                    'tags.Action'   , 'tags.Adventure'  , 'tags.Casual'     , 'tags.Experimental',
                    'tags.Puzzel'   , 'tags.Racing'     , 'tags.RPG'        , 'tags.Simulation' ,
                    'tags.Sports'   , 'tags.Strategy'   , 'tags.Tabletop'   , 'tags.Indie',
                    'gameIndex'];

    const json2csvParser = new Parser({ fields });

    const csv = json2csvParser.parse(mockupData);

    console.log(csv)
}

module.exports = {
    mockup,
    convertToCSV
}