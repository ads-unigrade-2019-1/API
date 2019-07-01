const Classes = require('../models/Class');
const GeneticAlgorithm = require('../algorithm/GeneticAlgorithm');
const CompatibilityRestriction = require('../algorithm/Restrictions/CompatibilityRestriction');
const ClassesIncludedRestriction = require('../algorithm/Restrictions/ClassesIncludedRestriction');
const PriorityRestriction = require('../algorithm/Restrictions/PriorityRestriction');
const FreeTimeRestriction = require('../algorithm/Restrictions/FreeTimeRestriction');
const NumberConsistentRestriction = require("../algorithm/Restrictions/NumberConsistentRestriction");
const Prando = require('prando');

function compareClassesPriority(classA, classB) {
    // returns 1 if classA > classB
    // returns -1 if classA < classB  

    // this approach lets us change more easily the comparsion
    // between two classes 
    if (classA.priority > classB.priority) {
        return 1;
    }

    return -1
}

function parseSelectedClasses(classesJson) {

    // convert json to a list of classes indicators
    // each element of this list is equal to a Class object
    // containing: name, code, discipline (code), meetings (list)
    let selectedClasses = classesJson;

    selectedClasses.sort(compareClassesPriority);

    return selectedClasses;
}

function parseTimeTables(timeTables) {

    return timeTables.map(element => {
        return element.selectedClasses
    });

}

module.exports = {
    mountTimetable(req, res) {

        // convert JSON from request to list o classes that will be fed to
        // the algoriithm
        let selectedClasses = parseSelectedClasses(req.body);

        const restrictions = [
            new CompatibilityRestriction(),
            new ClassesIncludedRestriction(0.6),
            new PriorityRestriction(0.8),
            new FreeTimeRestriction(2),
            new NumberConsistentRestriction()
        ];

        let geneticAlg = new GeneticAlgorithm(
            restrictions,
            selectedClasses,
            150,
            20
        );

        // res.json(parseTimeTables(greedy(selectedClasses)));
        res.json(parseTimeTables(
            geneticAlg.run()
        ));
    },

    async randomTimeTable(req, res) {

        let numbersUser = [];
        let classes = [];

        function getSafeSeed(seed) {
            if (seed === 0) return 1;
            return seed;
        }
        const MIN = -2147483648; // Int32 min
        const MAX = 2147483647; // Int32 max
        const seed = getSafeSeed(MIN + Math.floor((MAX - MIN) * Math.random()));
        let rng = new Prando(seed);

        console.log(seed);

        let maxSize = rng.nextInt(3, 15);
        let count = await Classes.estimatedDocumentCount({});

        for (let i = 0; i < maxSize; i++) {

            let randomNumber = rng.nextInt(0, count);
            while (numbersUser.indexOf(randomNumber) != -1) {
                randomNumber = rng.nextInt(0, count);
            }
            numbersUser.push(randomNumber);

            let c = await Classes.find({}).lean().limit(1).skip(randomNumber);
            classes.push(c[0]);
        }

        console.log(classes.map((obj) => {
            return obj.discipline + "_" + obj.name;
        }));

        req.body = classes;

        module.exports.mountTimetable(req, res);
    }
}
