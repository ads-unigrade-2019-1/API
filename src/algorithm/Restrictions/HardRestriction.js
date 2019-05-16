"use strict"
const Restriction = require("./Restriction")

class HardRestriction extends Restriction{

    constructor(){

        super();

        if (this.constructor === HardRestriction) {
            throw new TypeError('Abstract class "HardRestriction" cannot be instantiated directly.'); 
        }

        this.penality = 100;    

    }
}

module.exports = HardRestriction;