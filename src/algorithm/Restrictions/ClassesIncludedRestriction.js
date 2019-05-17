"use strict"
"use static"
const SoftRestriction = require("./SoftRestriction")

class ClassesIncludedRestrictions extends SoftRestriction{

    constructor(classes, minimalPercentage){

        super();

        this.classes = classes;
        this.disciplineAumount = ClassesIncludedRestrictions._disciplineCount(classes);
        this.minimalPercentage = minimalPercentage;
    }

    static _disciplineCount(classes) {

        let distinctClasses = [...new Set(classes.map(x => x.discipline))]

        return distinctClasses.length;
    }

    apply(timeTable) {

        let count = ClassesIncludedRestrictions._disciplineCount(timeTable.classes);

        if (count > this.minimalPercentage*this.disciplineAumount) return 0;

        return this.penality;
    }
}

module.exports = ClassesIncludedRestrictions;