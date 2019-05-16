"use strict"
const HardRestriction = require("./HardRestriction")

class CompatibilityRestriction extends HardRestriction {

    constructor(){
        super();
    }

    apply(timeTable){
        // returns the value of penality to apply
        
        if (timeTable.isConsistent()) return 0;

        return this.penality;
    }

}

module.exports = CompatibilityRestriction;