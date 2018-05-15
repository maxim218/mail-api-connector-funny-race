"use strict";

const boxes = [
    "auth_box",
    "registrate_box",
    "menu_box",
];

export default class Navigator {
    static hideAllBoxes() {
        boxes.forEach((boxID) => {
           document.getElementById(boxID.toString()).hidden = true;
        });
    }

    static showBox(boxID) {
        Navigator.hideAllBoxes();
        document.getElementById(boxID.toString()).hidden = false;
    }
}
