class SimpleDebug {
    constructor() {
        this.debugOn = true;
        this.debugDepth = 1000000000;
    }

    log(message, debugDepth = 5) {
        if ((message === null) || (message === undefined)) return;
        if (!this.debugOn) return;
        if (debugDepth > this.debugDepth) return;
        if (this.debugOn) {
            console.log(message);
        }
    }

    setLevel(newLevel) {
        this.debugDepth = newLevel;
    }

    setOn() {
        this.debugOn = true;
    }

    setOff() {
        this.debugOn = false;
    }

}

let logger = new SimpleDebug();

module.exports = {logger};