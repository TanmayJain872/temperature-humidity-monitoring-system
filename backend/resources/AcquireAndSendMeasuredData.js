/* jshint esversion: 11 */

// const request = require("request");
const fetch = require("node-fetch");
const SerialPort = require("serialport");
const { response, json } = require("express");


const options = {
    method: "POST", 
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }, 
    body: {}
};

const readLine = SerialPort.parsers.Readline;
const serialPort = new SerialPort("COM3", {path: "", baudRate: 9600});
const parser = serialPort.pipe(new readLine({delimiter: "\r\n"}));

parser.on("data", (data) => {
    let dataOfDate = new Date();
    let date = dataOfDate.toISOString().substring(0, 10) + dataOfDate.toString().substring(15, 24);
    let temperature = parseFloat(data.substring(0, 5));
    let relativeHumidity = parseFloat(data.substring(8, 13));
    options.body = JSON.stringify({Date: date, Temperature: temperature, RelativeHumidity: relativeHumidity});
    fetch("http://localhost:8080/api/quantities", options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch((error) => console.log(error));
});