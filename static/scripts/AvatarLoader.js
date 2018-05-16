"use strict";

import Ajax from "./Ajax";

export default class AvatarLoader {
    static loadAvatar() {
        Ajax.get("api/users/me", (xhr) => {
            const avatar = JSON.parse(xhr.responseText).avatar;
            const id = JSON.parse(xhr.responseText).id;
            localStorage.setItem("ID", id);
            if(avatar === null) {
                document.getElementById("menu_box_avatar_image").src = "./images/userImage.jpg";
            } else {
                document.getElementById("menu_box_avatar_image").src = avatar;
            }
        });
    }
}
