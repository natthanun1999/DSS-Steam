const { execSync } = require('child_process');

const readCSVFile = (filename) => {
    const pathExec = execSync("echo %cd%").toString()
    const path = pathExec.slice(0, pathExec.length - 2);

    const cmd = `type ${path}\\Weka\\${filename}`;

    let execute = execSync(cmd).toString();
    execute = execute.slice(0, execute.length - 2);
    execute = execute.split("\n")
    execute = execute.slice(1, execute.length)
    execute = execute.map((v) => {
        v = v.replace("\r", "")
        v = v.split(",")

        return {
            budget: v[0],
            age: v[1],
            category: v[2],
            tag: v[3],
            review_score: v[4],
            diff: v[5],
            gameIndex: v[6]
        }
    })

    return execute
}

const filterByInput = (userInput, gameList) => {
   let gameByFilter = gameList.filter((game) => {
        if (game.budget     == userInput.budget &&
            game.age        == userInput.age &&
            game.category   == userInput.category &&
            game.tag        == userInput.tag) {
            return true;
        } else {
            return false
        }
    });

    return gameByFilter
}

const getMostPick = (userInput) => {
    let gameList = readCSVFile("Data.csv")
    gameList = filterByInput(userInput, gameList)
    
    let uniqueGameIDs = []

    gameList.forEach((g) => {
        let appids = uniqueGameIDs.map(v => v.appid)

        if (!appids.includes(g.gameIndex)) {
            uniqueGameIDs.push({
                appid: g.gameIndex,
                review_score: g.review_score,
                diff: g.diff,
                count: 0
            })
        } else {
            let index = uniqueGameIDs.findIndex((elem) => elem.appid === g.gameIndex);
            uniqueGameIDs[index].count += 1
        }
    })

    const count = uniqueGameIDs.map(v => v.count)
    const index = count.indexOf(Math.max(...count))

    return uniqueGameIDs[index]
}

module.exports = {
    getMostPick
}