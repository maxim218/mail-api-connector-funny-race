"use strict";

export default class CanvasManager {
    constructor() {
        const can = document.getElementById('two_players_box_canvas');
        this.holst = can.getContext('2d');
    }

    drawFon() {
        this.holst.fillStyle = '#0000FF';
        this.holst.clearRect(0, 0, 800, 800);
        this.holst.fillRect(0, 0, 800, 800);
    }

    drawRect(color, xx, yy) {
        const holst = this.holst;
        holst.lineWidth = 3;
        holst.strokeStyle = color.toString();
        holst.strokeRect(xx, yy, 80, 80);
    }
}