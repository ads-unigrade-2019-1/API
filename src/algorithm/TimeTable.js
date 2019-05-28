"use strict"
"use static"
class TimeTable{

    constructor(classes, selectedClasses){
        
        this._classes = classes;
        this._chromosome = TimeTable.toChromosome(classes, selectedClasses);

        this._isUpdated = false;
        this._selectedClasses = [];

        this._isConsistent = true;

        this._uncompatibilityMap = new Map();
    }

    get classes(){
        return this._classes;
    }

    get selectedClasses(){
        
        if (this._isUpdated === false) this._update();

        return this._selectedClasses;
    }

    set selectedClasses(classes){

        this.chromosome = TimeTable.toChromosome(this._classes, classes)
    }

    get chromosome(){
        return this._chromosome;
    }

    set chromosome(chr){
        this._chromosome = chr;
        this._isUpdated = false;
    }

    _fromChromosome(){

        let selClasses = this._classes.map((obj, index) => {
            return this._chromosome[index] === true ? obj: null;
        });

        let x = selClasses.filter((obj) => {return obj != null});
        return x;
    }

    static toChromosome(classes, selected){

        return classes.map((obj) => {

            let classIndex = selected.indexOf(obj);
            
            if (classIndex >= 0){
                return true;
            }

            return false;
        });
    }

    append(c){
        if(this._canInsert(c)){
            
            let index = this._classes.indexOf(c);
            this._chromosome[index] = true;
            this._isUpdated = false;
            return true;
        }

        return false;
    }

    static meetingOverlap(meetingA, meetingB) {
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

    static isClassesCompatible(classA, classB) {
        // returns  true if classA is compatible with classB
        
        if (classA.discipline.localeCompare(classB.discipline) === 0) return false;

        for (const elementA of classA.meetings) {
            for (const elementB of classB.meetings) {
                let overlap = this.meetingOverlap(elementA, elementB);
                
                if (overlap) return false;
            }
        }

        return true;
    }

    isConsistent() {
        // checks internal consistency of a time table

        if(this._isUpdated == false) this._update();
        
        return this._isConsistent;
    }

    _checkConsistency(){

        let testTable = new TimeTable(this._classes, []);

        for (const c of this._fromChromosome()) {
           
            if (testTable.append(c) === false) {
                return false;
            }
        }

        return true;
    }

    static _strfyClass(c){
        return c.discipline + "_" + c.name;
    }

    _appendUncompatibility(a, b){
        
        let strfA = TimeTable._strfyClass(a);

        let aList = this._uncompatibilityMap.get(strfA);
        
        if (aList == undefined){
            aList = [b, ];
        }else{
            if(aList.indexOf(b) != -1){
                return;
            }

            aList.push(b);
        }
        
        this._uncompatibilityMap.set(strfA, aList);
        this._appendUncompatibility(b, a);   
    }

    _getUncompatibilities(c) {
        let result = [];
        const search = TimeTable._strfyClass(c);

        if(this._uncompatibilityMap.has(search)){
            result = this._uncompatibilityMap.get(search); 
        }

        return result;
    }


    _canInsert(c) {
        // return true if a class is compatible with this timetable

        for (const element of this.selectedClasses) {
            
            if(this._getUncompatibilities(element).indexOf(c) != -1){ 
                return false;
            }
            
            if (TimeTable.isClassesCompatible(element, c) == false){ 
                this._appendUncompatibility(element, c);
                return false;
            }
        }

        return true;
    }

    _update(){
        // updates cached properties

        this._isConsistent = this._checkConsistency();
        this._selectedClasses = this._fromChromosome();

        this._isUpdated = true;
    }

}

module.exports = TimeTable;