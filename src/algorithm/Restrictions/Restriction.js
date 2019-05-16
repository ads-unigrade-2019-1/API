"use strict"
class Restriction{

    constructor(){

        if (this.constructor === Restriction) {
            throw new TypeError('Abstract class "Restriction" cannot be instantiated directly.'); 
        }
    }

    apply() { }
    
}

module.exports = Restriction;