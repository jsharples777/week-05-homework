class Logger {
    static debugOn = true;
    static debugDepth = 1000;

    static log(message, debugDepth = 5) {
        if ((message === null) || (message === undefined)) return;
        if (!this.debugOn) return;
        if (debugDepth > this.debugDepth) return;
        if (this.debugOn) {
            console.log(message);
        }
    }

    static setLevel(newLevel) {
        Logger.debugDepth = newLevel;
    }

    static setOn() {
        Logger.debugOn = true;
    }

    static setOff() {
        Logger.debugOn = false;
    }

}

module.exports = {Logger};