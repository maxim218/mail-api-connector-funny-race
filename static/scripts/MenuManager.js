"use strict";

import Ajax from "./Ajax";

export default class MenuManager {
    constructor() {
        MenuManager.addLogoutEvent();
    }

    static addLogoutEvent() {
        document.getElementById("menu_box_logout_btn").onclick = () => {
            localStorage.clear();
            Ajax.post("api/users/logout", JSON.stringify({}), (xhr) => {
               location.reload();
            });
        }
    }
}
