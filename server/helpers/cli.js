const { execSync } = require('child_process');
let Arff = require('arff-utils');
const fs = require('fs');

let modelTestCLI = (userInput, cb) => {
    let arff = new Arff.ArffWriter("relation Unseen", Arff.MODE_OBJECT);

    arff.addNominalAttribute("budget", ["A", "B", "C"]);
    arff.addNominalAttribute("age", ["A", "B"]);
    arff.addNominalAttribute("category", [
        "Multi-player",
        "Single-player",
        "Co-op"
    ]);
    arff.addNominalAttribute("tag", [
        "Casual",
        "Action",
        "Indie",
        "Simulation",
        "Adventure",
        "Racing",
        "Sports",
        "Strategy",
        "RPG"
    ]);

    arff.addNumericAttribute("review_score");
    arff.addNumericAttribute("diff");

    arff.addNominalAttribute("gameIndex", [
        "359550",
        "550",
        "346110",
        "105600",
        "1085660",
        "887830",
        "877200",
        "934930",
        "882020",
        "413150",
        "881100",
        "4000",
        "887800",
        "289070",
        "570",
        "252490",
        "892970",
        "1313860",
        "1263850",
        "882100",
        "930210",
        "926860",
        "304930",
        "878750",
        "227300",
        "933110",
        "924140",
        "1097150"
    ]);

    arff.addData({
        budget: userInput.budget,
        age: userInput.age,
        category: userInput.category,
        tag: userInput.tag,
        review_score: userInput.review_score,
        diff: userInput.diff,
        gameIndex: "?"
    })
    
    let writeStream = fs.createWriteStream('./Weka/Unseen.arff');

    arff.writeToStream(writeStream);

    writeStream.close()

    prediction((predict) => {
        cb(predict)
    })
};

let prediction = async (cb) => {
    let predict = ""

    await sleep(1000)

    const pathExec = execSync("echo %cd%").toString()
    const path = pathExec.slice(0, pathExec.length - 2);

    //const cmd = `java -classpath F:\\Weka\\weka.jar weka.classifiers.trees.J48 -l \"${path}\\Weka\\tree.model\" -T \"${path}\\Weka\\Unseen.arff\" -p 7`;
    const cmd = `java -classpath F:\\Weka\\weka.jar weka.classifiers.bayes.NaiveBayes -l \"${path}\\Weka\\naive.model\" -T \"${path}\\Weka\\Unseen.arff\" -p 7`;

    const execute = execSync(cmd).toString();
    predict = execute.split(":")[2];
    predict = predict.split(" ")[0]

    cb(predict)
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

module.exports = {
    modelTestCLI
}