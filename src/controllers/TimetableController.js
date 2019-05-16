const Classes = require('../models/Class');
const TimeTable = require('../algorithm/TimeTable');
const GeneticAlgorithm = require('../algorithm/GeneticAlgorithm');

function compareClassesPriority(classA, classB){
    // returns 1 if classA > classB
    // returns -1 if classA < classB  

    // this approach lets us change more easily the comparsion
    // between two classes 
    if (classA.priority > classB.priority){
        return 1;
    }

    return -1
}

function classValue(c){
    // returns a numerical value (5 to 1) for a class
    
    // since priority is a value from 1 to 5, with 1 beeing the higher
    // priority, we will subtract the actual value from the maximum + 1
    // value make it in a ascending order
    let result = 6 - c.priority;
    return result.clamp(1, 5);
}

function classesValueSum(cList){
    // returns the total value for a list of classes

    let value = 0;

    cList.forEach(element => {
        value += classValue(element)
    });
    
    return value;
}

function parseSelectedClasses(classesJson) {

    // convert json to a list of classes indicators
    // each element of this list is equal to a Class object
    // containing: name, code, discipline (code), meetings (list)
    let selectedClasses = classesJson;

    selectedClasses.sort(compareClassesPriority);

    return selectedClasses;
}

function parseTimeTables(timeTables){

    return parseTimeTables.map(element => {
        return element.classes
    });

}


module.exports = {
    mountTimetable(req, res) {

        // convert JSON from request to list o classes that will be fed to
        // the algoriithm
        let selectedClasses = parseSelectedClasses(req.body);

        let createdTimeTables = [new TimeTable([]), ];

        // greedy implementation for testing
        for (const c of selectedClasses) {
            
            let picked = false;

            for (let i = 0; i < createdTimeTables.length; i++) {
                let timeTable = createdTimeTables[i];
            
                if(timeTable.canInsert(c)){
                    picked = true;

                    timeTable.append(c);
                }

            }

            if (picked == false){
                let timeTable = new TimeTable([c, ]);
                createdTimeTables.push(timeTable);
            }            
        }

        res.json(parseTimeTables(createdTimeTables));
    }
}