"use strict"
const SoftRestriction = require("./SoftRestriction");

class PriorityRestriction extends SoftRestriction{

    constructor(minimalPercentage){
        super();

        this.minimalPercentage = minimalPercentage;

        this.biggest = 0
    }

    classValue(c) {
        // returns a numerical value (5 to 1) for a class
    
        // since priority is a value from 1 to 5, with 1 beeing the higher
        // priority, we will subtract the actual value from the maximum + 1
        // value make it in a ascending order
        let result = 6 - c.priority;
        return result;
        //return result.clamp(1, 5);
    }
    
    classesValueSum(cList) {
        // returns the total value for a list of classes
    
        let value = 0;
    
        cList.forEach(element => {
            value += this.classValue(element);
        }); 
    
        return value;
    }

    apply(timetable){
        //console.log(this.classesValueSum(timetable._classes));
        if (timetable.isConsistent()){
            let prioritySum = this.classesValueSum(timetable.selectedClasses);
            
            if (prioritySum > this.biggest){
                this.biggest = prioritySum;
            }

            if(prioritySum < this.minimalPercentage * this.biggest){
                return this.penality
            }else{
                return 0;
            }

        }else{
            return this.penality;
        }
    }

}

module.exports = PriorityRestriction;