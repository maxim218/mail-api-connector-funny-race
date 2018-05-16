"use strict";

import Navigator from "./Navigator";

const basicSocketUrl = "ws://localhost:8081/game";

export default class MultiplayerControl {
    static showNultiplayerPage() {
        Navigator.showBox("two_players_box");
    }

    constructor() {
        MultiplayerControl.showNultiplayerPage();
        this.startSocket();
        this.startSendingPing();
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
            console.log("Получено сообщение: " + event.data);
        };

        this.socket.onerror = (error) => {
            console.log("Ошибка: " + error.message);
        };
    }

    startSendingPing() {
        this.pingInterval = setInterval(() => {
            try {
                this.socket.send("PING");
            } catch (err) {
                console.log("Socket sending ping error");
            }
        }, 500);
    }
}
