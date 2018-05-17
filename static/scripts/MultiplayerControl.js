"use strict";

import Navigator from "./Navigator";
import CanvasManager from "./CanvasManager";
import KeysControlManager from "./KeysControlManager";

const basicSocketUrl = "ws://localhost:8081/game";

export default class MultiplayerControl {
    static showNultiplayerPage() {
        Navigator.showBox("two_players_box");
    }

    constructor() {
        MultiplayerControl.showNultiplayerPage();
        this.canvasManager = new CanvasManager();
        this.keysControlManager = new KeysControlManager();
        this.startSocket();
        this.startSendingPing();

        this.keysControlManager.initCallbacks(() => {
            try {
                this.socket.send(JSON.stringify({
                    class: "GameAction",
                    action: "UP",
                }));
            } catch (err) {}
        }, () => {
            try {
                this.socket.send(JSON.stringify({
                    class: "GameAction",
                    action: "DOWN",
                }));
            } catch (err) {}
        });
    }

    messageEvent(event) {
        console.log("Получено сообщение: " + event.data);
        const messageObj = JSON.parse(event.data.toString());
        const classValue = messageObj.class;

        // start game
        if(classValue === "InitGameMessage") {
            document.getElementById("two_players_box_enemy_label").innerHTML = "Ваш соперник: " + messageObj.enemy.toString();
            this.canvasManager.drawFon();
        }

        // game process
        if(messageObj.your_player !== null) {
            // clear fon
            this.canvasManager.drawFon();
            // drawing first meteors
            messageObj.your_objects.forEach((element) => {
                if(element.type === "meteor") {
                    this.canvasManager.drawRect("#FF0000", element.x, element.y);
                }
            });
            // drawing second meteor
            messageObj.enemy_objects.forEach((element) => {
                if(element.type === "meteor") {
                    this.canvasManager.drawRect("#33ff27", element.x, element.y);
                }
            });
            // draw first player
            const firstPlayer = messageObj.your_player;
            this.canvasManager.drawRect("#99b7cc", firstPlayer.x, firstPlayer.y);
            // draw second player
            const secondPlayer = messageObj.enemy_player;
            this.canvasManager.drawRect("#32d97e", secondPlayer.x, secondPlayer.y);
        }
    }

    startSocket() {
        this.socket = new WebSocket(basicSocketUrl);

        this.socket.onopen = function() {
            console.log("Соединение установлено");
        };

        this.socket.onclose = (event) => {
            console.log("Соединение закрыто");
        };

        this.socket.onmessage = (event) => {
            try {
                this.messageEvent(event);
            } catch (err) {
                // err
            }
        };

        this.socket.onerror = (error) => {
            console.log("Ошибка: " + error.message);
        };
    }

    startSendingPing() {
        this.pingInterval = setInterval(() => {
            try {
                this.socket.send(JSON.stringify({
                    ping: "hi_" + Math.random() + "_hi",
                    class: "EmptyMessage",
                }));
            } catch (err) {
                console.log("Socket sending ping error");
            }
        }, 500);
    }
}
