/* jshint esversion: 6 */

const express = require("express");
const app = express();
const mysql = require("mysql");

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

connection.connect((error) => {
    if (error) throw error;
    console.log("Connected!");
});

app.use(express.json());
app.post("/api/quantities", (request, response) => {
    const data = request.body;
    console.log(data);
    const query = "INSERT INTO TemperatureAndHumidityMeasurements (DateTime, Temperature, RelativeHumidity) VALUES ('" + 
                    data.Date + "', '" + data.Temperature + "', '" + data.RelativeHumidity + "')";
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("Inserted Record!");
    });
});

const server = app.listen(process.env.PORT || 8080, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`App listening at http://${host}:${port}`);
});