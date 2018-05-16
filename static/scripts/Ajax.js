"use strict";

const basicUrl = "http://localhost:8081/";

export default class Ajax {
    static post(url, bodyString, callback) {
        url = basicUrl + url.toString();
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(bodyString);
        console.log("-------------------------");
        console.log("POST");
        console.log("Url: " + url);
        console.log("Body: " + bodyString);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                console.log("Status: " + xhr.status);
                console.log("Result: " + xhr.responseText);
                callback(xhr);
            }
        }
    }

    static get(url, callback) {
        url = basicUrl + url.toString();
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.send(null);
        console.log("-------------------------");
        console.log("GET");
        console.log("Url: " + url);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                console.log("Status: " + xhr.status);
                console.log("Result: " + xhr.responseText);
                callback(xhr);
            }
        }
    }

    static postFile(url, bodyString, callback) {
        url = basicUrl + url.toString();
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type","multipart/form-data;charset=UTF-8");
        xhr.send(bodyString);
        console.log("-------------------------");
        console.log("POST");
        console.log("Url: " + url);
        console.log("Body: " + bodyString);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                console.log("Status: " + xhr.status);
                console.log("Result: " + xhr.responseText);
                callback(xhr);
            }
        }
    }
}