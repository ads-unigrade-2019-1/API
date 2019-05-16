"use strict"
class TimeTable{

    constructor(classes){
        
        this.classes = classes;

    }

    append(c){

        this.classes.appendClass(c);

    }

    meetingOverlap(meetingA, meetingB) {
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

    isClassesCompatible(classA, classB) {
        // returns  true if classA is compatible with classB
        
        if (classA.discipline.localeCompare(classB.discipline) == 0) return false;

        for (const elementA of classA.meetings) {
            for (const elementB of classB.meetings) {
                let overlap = this.meetingOverlap(elementA, elementB);
                
                if (overlap) return false;
            }
        }

        return true;
    }

    canInsert(c) {
        // return true if a class is compatible with a timetable

        for (const element of this.classes) {
            if (this.isClassesCompatible(element, c) == false) return false;
        }

        return true;
    }

}

module.exports = TimeTable;