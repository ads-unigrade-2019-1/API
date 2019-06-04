"use strict"
const Restriction = require("./Restriction")

class RestrictionComposite extends Restriction{

    constructor(){

        super();

        this.restrictons = [];
    }

    add(restriction){
        
        this.restrictons.push(restriction);
    }

    remove(restriction){
        let index = this.restrictons.indexOf(restriction)
        
        if (index >= 0){
        
            this.restrictons.splice(index);
            
            return true;
        }
        
        return false;
    }

    apply(timeTable){

        let penalitiesSum = 0;

        for (const restriction of this.restrictons) {
            penalitiesSum += restriction.apply(timeTable);
        }
        
        return 100 / (100 + penalitiesSum);
    }

}

module.exports = RestrictionComposite;