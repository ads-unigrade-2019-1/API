const object = `[
                {"name" : "A", "vacancies" : 2, "discipline" : "203882", "meetings" : [ { "day" : "Segunda", "init_hour" : "08:00", "final_hour" : "09:50", "room" : "FGA-LAB MOCAP" }, { "day" : "Sexta", "init_hour" : "08:00", "final_hour" : "09:50", "room" : "FGA-LAB MOCAP" } ], "shift" : "Diurno", "teachers" : [ "MILENE SERRANO" ], "campus" : 4, "priority": 5}, 
                {"name" : "A", "vacancies" : 38, "discipline" : "130508", "meetings" : [ { "day" : "Segunda", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-LAB MOCAP" }, { "day" : "Sexta", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-LAB MOCAP" } ], "shift" : "Diurno", "teachers" : [ "MAURICIO SERRANO" ], "campus" : 4,  "priority": 2 },
                {"name" : "A", "vacancies" : 31, "discipline" : "208698", "meetings" : [ { "day" : "Terça", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-S7" }, { "day" : "Quinta", "init_hour" : "10:00", "final_hour" : "11:50", "room" : "FGA-S7" } ], "shift" : "Diurno", "teachers" : [ "CRISTIANE SOARES RAMOS" ], "campus" : 4,  "priority": 2 },
                {"name" : "A", "vacancies" : 14, "discipline" : "206580", "meetings" : [ { "day" : "Segunda", "init_hour" : "14:00", "final_hour" : "15:50", "room" : "FGA-LAB MOCAP" }, { "day" : "Quarta", "init_hour" : "14:00", "final_hour" : "15:50", "room" : "FGA-S7" } ], "shift" : "Diurno", "teachers" : [ "RICARDO AJAX DIAS KOSLOSKI" ], "campus" : 4 , "priority": 3}, 
                {"name" : "B", "vacancies" : 1, "discipline" : "101095", "meetings" : [ { "day" : "Terça", "init_hour" : "16:00", "final_hour" : "17:50", "room" : "FGA-I7" }, { "day" : "Quinta", "init_hour" : "16:00", "final_hour" : "17:50", "room" : "FGA-S8" } ], "shift" : "Diurno", "teachers" : [ "BRUNO CÉSAR RIBAS" ], "campus" : 4,  "priority": 1 }
                 ]`

function parseObjects(timetableJson) {

    let timetableObject = JSON.parse(timetableJson)
    timetableObject.sort((classA, classB) => (classA.priority > classB.priority) ? 1 : -1)

    return timetableObject
}

module.exports = {
    mountTimetable(req, res) {
        res.json(parseObjects(object))
    }
}