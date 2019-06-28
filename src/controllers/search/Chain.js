"use strict"

class Chain {

    constructor() {

        if (this.construct === Chain) {
            throw new TypeError('Abstract class "Chain" cannot be instantiated directly');
        }

        if (this.setNext === undefined) {
            throw new TypeError(this.construct + " -- must override 'setNext'");
        }

        if (this.execute === undefined) {
            throw new TypeError(this.construct + " -- must override 'execute'");
        }

    }

}

module.exports = Chain;