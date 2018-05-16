"use strict";

import Ajax from "./Ajax";

export default class MenuManager {
    constructor() {
        MenuManager.addLogoutEvent();
        MenuManager.addAvatarEvent();
    }

    static addLogoutEvent() {
        document.getElementById("menu_box_logout_btn").onclick = () => {
            localStorage.clear();
            Ajax.post("api/users/logout", JSON.stringify({}), (xhr) => {
               location.reload();
            });
        }
    }

    static addAvatarEvent() {
        document.getElementById("menu_box_send_avatar_btn").onclick = () => {
            MenuManager.sendAvatar();
        };

        document.getElementById("menu_box_choose_file_btn").onchange = () => {
            const files = document.getElementById("menu_box_choose_file_btn").files;
            const file = files[0];
            const myReader = new FileReader();
            myReader.readAsDataURL(file);
            myReader.onload = function(e) {
                document.getElementById("menu_box_avatar_image").src = e.target.result;
            }
        };
    }

    static sendAvatar() {
        const imageStr = document.getElementById("menu_box_avatar_image").src;
        const id = parseInt(localStorage.getItem("ID"));

        Ajax.postFile("api/avatars/upload", "file=" + imageStr, (xhr) => {

        });
    }
}
