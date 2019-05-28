"use strict"
"use static"
const SoftRestriction = require("./SoftRestriction")

class ClassesIncludedRestrictions extends SoftRestriction{

    constructor(minimalPercentage){

        super();

        this.minimalPercentage = minimalPercentage;
    }

    static _disciplineCount(classes) {

        let distinctClasses = [...new Set(classes.map(x => x.discipline))]

        return distinctClasses.length;
    }

    apply(timeTable) {

        let count = ClassesIncludedRestrictions._disciplineCount(timeTable.selectedClasses);
        let minimalValue = ClassesIncludedRestrictions._disciplineCount(timeTable.classes);

        if (count >= Math.ceil(this.minimalPercentage*minimalValue)) return 0;

        return this.penality;
    }
}

module.exports = ClassesIncludedRestrictions;