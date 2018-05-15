"use strict";

import Navigator from "./Navigator";
import Ajax from "./Ajax";

export default class AuthManager {
    constructor() {
        AuthManager.moveEvent();
        AuthManager.authEvent();
    }

    static authEvent() {
        function getElementValue(id) {
            return document.getElementById(id.toString()).value.toString();
        }

        document.getElementById("auth_box_auth_btn").onclick = () => {
            const login = getElementValue("auth_box_login_field");
            const password = getElementValue("auth_box_password_field");
            Ajax.post("api/users/signin", JSON.stringify({
                loginField: login,
                passwordField: password,
            }), (xhr) => {
                const success = JSON.parse(xhr.responseText).success;
                if(success === false) {
                    alert("Неверный логин или пароль.");
                } else {
                    alert("Авторизация прошла успешно.");
                    localStorage.setItem("LOGIN", login);
                    localStorage.setItem("PASSWORD", password);
                    document.getElementById("menu_box_login_label").innerHTML = "Пользователь: " + localStorage.getItem("LOGIN");
                    Navigator.showBox("menu_box");
                }
            });
        };
    }

    static moveEvent() {
        document.getElementById("auth_box_move_btn").onclick = () => {
            Navigator.showBox("registrate_box");
        }
    }
}
