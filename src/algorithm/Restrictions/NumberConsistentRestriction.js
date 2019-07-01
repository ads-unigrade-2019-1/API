"use strict"

const HardRestriction = require("./HardRestriction")

class NumberConsistentsRestriction extends HardRestriction {

    constructor() {
        super();
    }

    apply(timetable) {

        for (let consistent of timetable.chromosome) {
            if (consistent) {
                return 0;
            }
        }

        return this.penality;
    }

}

module.exports = NumberConsistentsRestriction;