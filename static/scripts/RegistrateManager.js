"use strict";

import Navigator from "./Navigator";
import Ajax from "./Ajax";
import AvatarLoader from "./AvatarLoader";

export default class RegistrateManager {
    constructor() {
        RegistrateManager.moveEvent();
        RegistrateManager.registrateEvent();
    }

    static moveEvent() {
        document.getElementById("registrate_box_move_btn").onclick = () => {
            Navigator.showBox("auth_box");
        }
    }

    static registrateEvent() {
        document.getElementById("registrate_box_registrate_btn").onclick = () => {
            const login = document.getElementById("registrate_box_login_field").value.toString();
            const password = document.getElementById("registrate_box_password_field").value.toString();
            const email = login + "@mail.ru";

            Ajax.post("api/users/signup", JSON.stringify({
                loginField: login,
                passwordField: password,
                emailField: email
            }), (xhr) => {
                const success = JSON.parse(xhr.responseText).success;
                if(success === false) {
                    alert("Пользователь с таким логином уже есть в БД.");
                } else {
                    alert("Регистрация прошла успешно.");
                    localStorage.setItem("LOGIN", login);
                    localStorage.setItem("PASSWORD", password);
                    document.getElementById("menu_box_login_label").innerHTML = "Пользователь: " + localStorage.getItem("LOGIN");
                    Navigator.showBox("menu_box");
                    AvatarLoader.loadAvatar();
                }
            });
        };
    }
}