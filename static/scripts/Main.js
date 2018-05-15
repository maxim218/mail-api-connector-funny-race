"use strict";

import Navigator from "./Navigator";
import AuthManager from "./AuthManager";
import RegistrateManager from "./RegistrateManager";
import MenuManager from "./MenuManager";
import UserInitManager from "./UserInitManager";

class Main {
    constructor() {
        Navigator.showBox("auth_box");
        new AuthManager();
        new RegistrateManager();
        new MenuManager();
        new UserInitManager();
    }
}

window.onload = function() {
    new Main();
};
