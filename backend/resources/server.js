/* jshint esversion:6 */

const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const { stubString } = require("lodash");

const app = express();

// const io = require("socket.io")(server);
// app.use(express.static("public")); //Send index.html page on GET /
app.use(cors());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tanmaysql",
    database: "mydb"

    // host: "34.93.79.195", 
    // // socketPath: "/cloudsql/thematic-mapper-274909:asia-south1:tj-project-db",
    // user: "tanmay-jain",
    // password: "t@nm@ysql",
    // database: "my_cloud_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("You are now connected with mysql database...");
});

app.get("/api/temperature-humidity/recent-data/", (request, response) => {
    connection.query("SELECT Temperature, RelativeHumidity FROM TemperatureAndHumidityMeasurements ORDER BY DateTime DESC LIMIT 0, 1", 
        (error, result) => {
            if (error) throw error;
            response.send(result[0]);
        }
    );
});

app.get("/api/th/values/", (request, response) => {
    let query;
    if (!Object.keys(request.query).length) {
        connection.query("SELECT * FROM TemperatureAndHumidityMeasurements ORDER BY DateTime DESC LIMIT 0, 15", (error, result, fields) => {
            if (error) throw error;
            response.send(result.map(data => {
                data.DateTime = data.DateTime.toISOString().substring(0, 19).replace("T", " ");
                return data;
            }));
        });
    }
    else if (Object.keys(request.query).length == 4) {
        // console.log(request.query);
        query = "SELECT * FROM TemperatureAndHumidityMeasurements WHERE DateTime ";
        // if ("initialDate" in request.query && "initialTime" in request.query) {
        if ((request.query.initialDate.length == 10 && request.query.initialTime.length == 8) && (request.query.finalDate == "" && request.query.finalTime == "")) {
            query += ">= '" + request.query.initialDate + " " + request.query.initialTime + "' ORDER BY DateTime DESC";
            let date = new Date().toString();
            connection.query(query, (error, result, fields) => {
                if (error) throw error;
                response.send(result);
            });
        }
        // else if ("finalDate" in request.query && "finalTime" in request.query) {

        // else if (request.query.finalDate.length == 10 && request.query.finalTime.length == 8) {
        //     if (request.query.initialDate == "" && request.query.initialTime == "") {
        //         query += "<= '" + request.query.finalDate + " " + request.query.finalTime + "' ORDER BY DateTime DESC";
        //         connection.query(query, (error, result, fields) => {
        //             if (error) throw error;
        //             response.send(result);
        //         });
        //     }
        //     else if (request.query.initialDate.length == 10 && request.query.initialTime.length == 8) {
        //         const initialDateTime = request.query.initialDate + " " + request.query.initialTime;
        //         const finalDateTime = request.query.finalDate + " " + request.query.finalTime;
        //         query = "SELECT * FROM quantities WHERE DateTime BETWEEN '" + initialDateTime + "' AND '" + finalDateTime + "' ORDER BY DateTime DESC";
        //         connection.query(query, (error, result, fields) => {
        //             if (error) throw error;
        //             response.send(result);
        //         });
        //     }
        // }

        else if ((request.query.finalDate.length == 10 && request.query.finalTime.length == 8) && (request.query.initialDate == "" && request.query.initialTime == "")){
            query += "<= '" + request.query.finalDate + " " + request.query.finalTime + "' ORDER BY DateTime DESC";
            connection.query(query, (error, result, fields) => {
                if (error) throw error;
                response.send(result);
            });
        }
        else if ((request.query.initialDate.length == 10 && request.query.initialTime.length == 8) && (request.query.finalDate.length == 10 && request.query.finalTime.length == 8)) {
            const initialDateTime = request.query.initialDate + " " + request.query.initialTime;
            const finalDateTime = request.query.finalDate + " " + request.query.finalTime;
            query = "SELECT * FROM TemperatureAndHumidityMeasurements WHERE DateTime BETWEEN '" + initialDateTime + "' AND '" + finalDateTime + "' ORDER BY DateTime DESC";
            connection.query(query, (error, result, fields) => {
                if (error) throw error;
                response.send(result);
            });
        }
    }
});

app.get("/api/th/values/:initialTime/:finalTime/", (request, response) => {
    // response.send(request.query);
    // response.send(request.params);
    let query = "SELECT * FROM TemperatureAndHumidityMeasurements WHERE DateTime BETWEEN '2020-08-02 18:54:35' AND '2020-08-02 18:54:47' ORDER BY DateTime DESC";
    connection.query(query, (error, result, fields) => {
        if (error) throw error;
        response.send(result);
    });
});

const server = app.listen(process.env.PORT || 3005, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`App listening at http://${host}:${port}`);
});

// Version - 2
// io.on("connection", (socket) => {
//     console.log("Someone Connected!");
//     console.log(socket.disconnected);

//     let setIntervalID = setInterval(() => {
//         if (socket.disconnected == true) {
//             clearInterval(setIntervalID);
//             console.log("User disconnected!");
//             console.log(socket.disconnected);
//         }
//         else {
//             connection.query("SELECT * FROM TemperatureAndHumidityMeasurements ORDER BY Date DESC, Time DESC LIMIT 1, 15", (error, result, fields) => {
//                 if (error) throw error;
//                 console.log(result[result.length - 1]);
//                 // console.log(result[result.length - 1]);
//                 io.sockets.emit("lastData", result);
//             });
//         }
//     }, 1000);
// });


/* Version - 1
io.on("connection", (socket) => {
    console.log("Someone Connected!");

    socket.on("disconnect", () => {
        console.log("User disconnected!");
        console.log(socket.disconnected);
    });
    
    let setIntervalID = setInterval(() => {
        if (socket.disconnected == true) {
            clearInterval(setIntervalID);
        }
        else {
            connection.query("SELECT * FROM TemperatureAndHumidityMeasurements ORDER BY Date DESC, Time DESC LIMIT 1", (error, result, fields) => {
                if (error) throw error;
                // console.log(result);
                let lastData = result[result.length - 1];
                console.log(result[result.length - 1]);
                io.sockets.emit("lastData", lastData);
            });
        }
    }, 1000);

});
*/