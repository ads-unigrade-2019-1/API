"use strict"
const Restriction = require("./Restriction")

class SoftRestriction extends Restriction{

    constructor(){

        super();

        if (this.constructor === SoftRestriction) {
            throw new TypeError('Abstract class "SoftRestriction" cannot be instantiated directly.'); 
        }

        this.penality = 10;

    }
}

module.exports = SoftRestriction;