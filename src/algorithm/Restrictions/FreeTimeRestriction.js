"use strict"
const SoftRestriction = require("./SoftRestriction");

class FreeTimeRestriction extends SoftRestriction{

    constructor(limit = 3){
        super();

        this._limit = limit;
    }

    _stringToDate(str){
        let times = str.split(":");

        // some date values are predefined, so we can avoid
        // edge cases (like one date beeing processed 23:59h
        // and the next on the other day at 00:00h)
        return new Date(1997, 12, 3, times[0], times[1], 0, 0);
    }

    apply(timetable){

        let days = timetable.daysMatrix;

        if (days == null) return this.penality;

        let totalDays = 0;
        let freeTime = 0;

        for (const value of days.values()) {
           
            if (value.length > 0) totalDays++;

            if (value.length < 2) continue;
            
            
            let dates = value.map((meeting) => {
                return [
                    this._stringToDate(meeting.init_hour),
                    this._stringToDate(meeting.final_hour)
                ];
            });

            dates.sort((a, b) => {
                return a[0] > b[0];
            });

            for (let i = 0; i < dates.length - 1; i++) {
                freeTime += (dates[i+1][0] - dates[i][1]) / 60000; //converts from ms to minutes
            }
        }
        
        freeTime = freeTime / 60; //converts from minutes to hours
        
        let meanFreetime = freeTime / totalDays;

        if (meanFreetime < this._limit) return 0;
    
        return this.penality;
    }
}

module.exports = FreeTimeRestriction;