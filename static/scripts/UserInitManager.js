"use strict";

import Ajax from "./Ajax";
import Navigator from "./Navigator";

export default class UserInitManager {
    constructor() {
        this.getStoreValues();
        UserInitManager.logout(() => {
            this.authUser();
        });
    }

    authUser() {
        if(this.login === null) {
            return;
        }

        if(this.password === null) {
            return;
        }

        const login = this.login;
        const password = this.password;

        Ajax.post("api/users/signin", JSON.stringify({
            loginField: login,
            passwordField: password,
        }), (xhr) => {
            const success = JSON.parse(xhr.responseText).success;
            if(success === false) {
                // do nothing
            } else {
                localStorage.setItem("LOGIN", login);
                localStorage.setItem("PASSWORD", password);
                document.getElementById("menu_box_login_label").innerHTML = "Пользователь: " + localStorage.getItem("LOGIN");
                Navigator.showBox("menu_box");
            }
        });
    }

    static logout(callback) {
        localStorage.clear();
        Ajax.post("api/users/logout", JSON.stringify({}), (xhr) => {
            callback();
        });
    }

    getStoreValues() {
        this.login = localStorage.getItem("LOGIN");
        this.password = localStorage.getItem("PASSWORD");
        console.log("Login: " + this.login);
        console.log("Password: " + this.password);
    }
}
