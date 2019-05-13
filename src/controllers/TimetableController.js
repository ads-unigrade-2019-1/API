const Classes = require('../models/Class');

const object = `[
                {"name" : "A", "vacancies" : 2, "discipline" : "203882", "meetings" : [ { "day" : "Segunda", "init_hour" : "08:00", "final_hour" : "09:50", "room" : "FGA-LAB MOCAP" }, { "day" : "Sexta", "init_hour" : "08:00", "final_hour" : "09:50", "room" : "FGA-LAB MOCAP" } ], "shift" : "Diurno", "teachers" : [ "MILENE SERRANO" ], "campus" : 4, "priority": 5}, 
                {"name" : "A", "vacancies" : 38, "discipline" : "130508", "meetings" : [ { "day" : "Segunda", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-LAB MOCAP" }, { "day" : "Sexta", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-LAB MOCAP" } ], "shift" : "Diurno", "teachers" : [ "MAURICIO SERRANO" ], "campus" : 4,  "priority": 2 },
                {"name" : "A", "vacancies" : 31, "discipline" : "208698", "meetings" : [ { "day" : "Terça", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-S7" }, { "day" : "Quinta", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-S7" } ], "shift" : "Diurno", "teachers" : [ "CRISTIANE SOARES RAMOS" ], "campus" : 4,  "priority": 2 },
                {"name" : "A", "vacancies" : 14, "discipline" : "206580", "meetings" : [ { "day" : "Segunda", "init_hour" : "14:00", "final_hour" : "15:50", "room" : "FGA-LAB MOCAP" }, { "day" : "Quarta", "init_hour" : "14:00", "final_hour" : "15:50", "room" : "FGA-S7" } ], "shift" : "Diurno", "teachers" : [ "RICARDO AJAX DIAS KOSLOSKI" ], "campus" : 4 , "priority": 3}, 
                {"name" : "B", "vacancies" : 1, "discipline" : "101095", "meetings" : [ { "day" : "Terça", "init_hour" : "16:00", "final_hour" : "17:50", "room" : "FGA-I7" }, { "day" : "Quinta", "init_hour" : "16:00", "final_hour" : "17:50", "room" : "FGA-S8" } ], "shift" : "Diurno", "teachers" : [ "BRUNO CÉSAR RIBAS" ], "campus" : 4,  "priority": 1 }
                 ]`

const timetableDefault = [
    { "name": "", "day": "Segunda", "init_hour": "06:00", "final_hour": "07:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "06:00", "final_hour": "07:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "06:00", "final_hour": "07:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "06:00", "final_hour": "07:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "06:00", "final_hour": "07:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "06:00", "final_hour": "07:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "08:00", "final_hour": "09:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "08:00", "final_hour": "09:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "08:00", "final_hour": "09:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "08:00", "final_hour": "09:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "08:00", "final_hour": "09:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "08:00", "final_hour": "09:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "10:00", "final_hour": "11:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "10:00", "final_hour": "11:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "10:00", "final_hour": "11:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "10:00", "final_hour": "11:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "10:00", "final_hour": "11:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "10:00", "final_hour": "11:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "12:00", "final_hour": "13:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "12:00", "final_hour": "13:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "12:00", "final_hour": "13:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "12:00", "final_hour": "13:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "12:00", "final_hour": "13:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "12:00", "final_hour": "13:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "14:00", "final_hour": "15:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "14:00", "final_hour": "15:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "14:00", "final_hour": "15:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "14:00", "final_hour": "15:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "14:00", "final_hour": "15:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "14:00", "final_hour": "15:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "16:00", "final_hour": "17:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "16:00", "final_hour": "17:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "16:00", "final_hour": "17:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "16:00", "final_hour": "17:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "16:00", "final_hour": "17:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "16:00", "final_hour": "17:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "18:00", "final_hour": "19:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "18:00", "final_hour": "19:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "18:00", "final_hour": "19:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "18:00", "final_hour": "19:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "18:00", "final_hour": "19:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "18:00", "final_hour": "19:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "20:00", "final_hour": "21:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "20:00", "final_hour": "21:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "20:00", "final_hour": "21:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "20:00", "final_hour": "21:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "20:00", "final_hour": "21:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "20:00", "final_hour": "21:50", "room": "" },
    
    { "name": "", "day": "Segunda", "init_hour": "22:00", "final_hour": "23:50", "room": "" },
    { "name": "", "day": "Terça", "init_hour": "22:00", "final_hour": "23:50", "room": "" },
    { "name": "", "day": "Quarta", "init_hour": "22:00", "final_hour": "23:50", "room": "" },
    { "name": "", "day": "Quinta", "init_hour": "22:00", "final_hour": "23:50", "room": "" },
    { "name": "", "day": "Sexta", "init_hour": "22:00", "final_hour": "23:50", "room": "" },
    { "name": "", "day": "Sabado", "init_hour": "22:00", "final_hour": "23:50", "room": "" },

]

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

function meetingOverlap(meetingA, meetingB) {
    // returns true if meetingA and meetingB occours at
    // the same time

    // a meeting is:
    // {
    //     room : String,
    //     day : String,
    //     init_hour : String,
    //     final_hour : String
    // }

    // removing simpler case first
    if (meetingA.day.localeCompare(meetingB.day) != 0) return false;

    // now analyze by start time
    // if the start time of X is between the start time and end time of Y
    // the occour at the same time
    function stringToDate(str){
        let times = str.split(":");

        // some date values are predefined, so we can avoid
        // edge cases (like one date beeing processed 23:59h
        // and the next on the other day at 00:00h)
        return new Date(1997, 12, 3, times[0], times[1], 0, 0);
    }

    function convertStringToHourNumber(meeting){
        // returns a list with date objects representing the meetings

        let init_hour = stringToDate(meeting.init_hour);
        let final_hour = stringToDate(meeting.final_hour);

        return [init_hour, final_hour];
    }
    
    function byStartTime(X, Y){
        const INIT_HOUR = 0;
        const FINAL_HOUR = 1;

        return Y[INIT_HOUR] <= X[INIT_HOUR] && X[INIT_HOUR] <= Y[FINAL_HOUR];
    }
    
    let hoursA = convertStringToHourNumber(meetingA);
    let hoursB = convertStringToHourNumber(meetingB);

    if (byStartTime(hoursA, hoursB) || byStartTime(hoursB, hoursA)) return true;

    return false;
}

function isClassesCompatible(classA, classB) {
    // returns  true if classA is compatible with classB
    
    if (classA.discipline.localeCompare(classB.discipline) == 0) return false;

    for (const elementA of classA.meetings) {
        for (const elementB of classB.meetings) {
            let overlap = meetingOverlap(elementA, elementB);
            
            if (overlap) return false;
        }
    }

    return true;
}

function isClassCompatibleWithTimeTable(timeTable, c) {
    // return true if a class is compatible with a timetable

    for (const element of timeTable) {
        if (isClassesCompatible(element, c) == false) return false;
    }

    return true;
}

module.exports = {
    mountTimetable(req, res) {

        // convert JSON from request to list o classes that will be fed to
        // the algoriithm
        let selectedClasses = parseSelectedClasses(req.body);

        let createdTimeTables = [[], ];

        // greedy implementation for testing
        for (const c of selectedClasses) {
            
            let picked = false;

            for (let i = 0; i < createdTimeTables.length; i++) {
                let timeTable = createdTimeTables[i];
            
                if(isClassCompatibleWithTimeTable(timeTable, c)){
                    picked = true;

                    timeTable.push(c);
                }

            }

            if (picked == false){
                let timeTable = [c, ];
                createdTimeTables.push(timeTable);
            }            
        }

        res.json(createdTimeTables);
    }
}