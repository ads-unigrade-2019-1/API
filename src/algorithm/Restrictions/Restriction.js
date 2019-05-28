"use strict"
class Restriction{

    constructor(){

        if (this.constructor === Restriction) {
            throw new TypeError('Abstract class "Restriction" cannot be instantiated directly.'); 
        }

        if (this.apply === undefined) {
            throw new TypeError(this.constructor + " -- Must override 'apply' method");
        }

    }
    
}

module.exports = Restriction;