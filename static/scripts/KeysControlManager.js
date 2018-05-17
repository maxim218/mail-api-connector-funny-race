"use strict";

const UP_KEY = 83;
const DOWN_KEY = 87;

export default class KeysControlManager {
    constructor() {
        this.callbackUp = function() {};
        this.callbackDown = function() {};
        this.up = false;
        this.down = false;
        this.addKeyUpEvent();
        this.addDownEvent();
    }

    static printVal(x) {
        for(let i = 0; i < 5; i++) {
            console.log((i + 1) + ") KEY " + x + " PRESS");
        }
    }

    initCallbacks(callbackUp, callbackDown) {
        this.callbackUp = callbackUp;
        this.callbackDown = callbackDown;
    }

    addKeyUpEvent() {
        window.onkeyup = (event) => {
            const n = event.keyCode;
            if(n === UP_KEY) {
                this.up = false;
            }

            if(n === DOWN_KEY) {
                this.down = false;
            }
        }
    }

    addDownEvent() {
        window.onkeydown = (event) => {
            const n = event.keyCode;
            if(n === UP_KEY) {
                if(this.up === false) {
                    this.up = true;
                    KeysControlManager.printVal(UP_KEY);
                    this.callbackUp();
                }
            }

            if(n === DOWN_KEY) {
                if(this.down === false) {
                    this.down = true;
                    KeysControlManager.printVal(DOWN_KEY);
                    this.callbackDown();
                }
            }
        }
    }
}