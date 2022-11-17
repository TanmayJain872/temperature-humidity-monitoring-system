/* jshint esversion: 11 */

import React, { useState, useEffect, memo } from 'react';
import { Chart, registerables, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
// import { Line } from 'react-chartjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import 'chartjs-adapter-date-fns';
import { de } from 'date-fns/locale';


Chart.defaults.color = "#000000";
Chart.register(...registerables, TimeScale);


const DataChartDisplayer = () => {

    let [detailsOfServerData, setDetailsOfServerData] = useState([]);
    // let details;

    useEffect(() => {
        setTimeout(async () => { 
            let response = await fetch("http://localhost:3005/api/th/values/");
            let details = await response.json();
            setDetailsOfServerData(details.reverse());
            console.log(detailsOfServerData);
        }, 1000);
    }, [detailsOfServerData]);

    // let listOfTimeStamps = detailsOfServerData.map(datapoint => datapoint.DateTime);

    const dataToBeDisplayed = {
            // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            labels: detailsOfServerData.map(datapoint => datapoint.DateTime),
            datasets:[
                {
                    label: "Temperature",
                    // data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
                    data: detailsOfServerData.map(datapoint => datapoint.Temperature),
                    borderColor: "red",
                    fill: false,
                    pointStyle: 'circle',
                    backgroundColor: 'red',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    lineTension: 0
                }, 
                {
                    label: "Humidity",
                    // data: [2, 4, 6, 7, 10, 12, 14, 15, 18, 20, 22, 23, 26, 28, 30],
                    data: detailsOfServerData.map(datapoint => datapoint.RelativeHumidity),
                    borderColor: "blue",
                    fill: false,
                    pointStyle: 'circle',
                    backgroundColor: 'blue',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    lineTension: 0
                }
            ]
        };
    
        const chartOptions = {
            responsive: true,
            plugins: {
                // title: {
                //     display: true,
                //     position: "top",
                //     text: "Temperature and Relative Humidity Chart",
                //     font: {size: 30, },
                //     color: "black"
                // },
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        color: "black",
                    }
                },
                tooltip: {
                    enabled: true
                },
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0, // 25,
                    bottom: 0,
                    top: 0 // 25
                }
            },
            scales: {
                // adapters: {
                //     date: {
                //         locale: de
                //     }
                // },
                x: {
                    // type: "linear",
                    // type: "time",
                    title: {
                        display: true,
                        text: "Local Time in (UTC)",
                        color: "black",
                        font: {size: 16}
                    },
                    ticks: {
                        // beginAtZero: true,
                        min: 0,
                        stepSize: 1
                    }
                    // grid: {
                    //     display: false
                    // }
                },
                y: {
                    beginAtZero: true,
                    // type: "linear",
                    // grid: {
                    //     display: false
                    // },
                    scaleLabel: {
                        display: true
                    },
                    ticks: {
                        min: 0,
                        max: 30,
                        stepSize: 2
                    }
                }
            }
        };

    return (
        <div style={{ margin: "auto", height: "60vh", width: "60vw", border: "1px solid black", padding: '16px' }}>
            <Line 
                data={dataToBeDisplayed}
                options={chartOptions}
                // sx={{  }}
            />
        </div>
    )
}

export default memo(DataChartDisplayer);



        // const dataToBeDisplayed = {
        //     labels: detailsOfServerData.map(datapoint => datapoint.DateTime),
        //     datasets: [{
        //         label: "Temperature",
        //         data: detailsOfServerData.map(datapoint => datapoint.Temperature),
        //         borderColor: "red",
        //         fill: false,
        //         pointStyle: 'circle',
        //         // backgroundColor: 'red',
        //         pointColor: 'red',
        //         pointRadius: 5,
        //         pointHoverRadius: 7,
        //         lineTension: 0
        //     }, 
        //     {
        //         label: "Humidity",
        //         data: detailsOfServerData.map(datapoint => datapoint.RelativeHumidity),
        //         borderColor: "blue",
        //         fill: false,
        //         pointStyle: 'circle',
        //         // backgroundColor: 'blue',
        //         pointColor: 'blue',
        //         pointRadius: 5,
        //         pointHoverRadius: 7,
        //         lineTension: 0
        //     }]
        // };
    
        // const chartOptions = {
        //     title: {
        //         display: true,
        //         text: "Temperature and Relative Humidity Graph",
        //         fontSize: 25
        //     },
        //     legend: {
        //         display: true,
        //         position: "top",
        //         labels: {
        //             fontColor: "black"
        //         }
        //     },
        //     layout: {
        //         padding: {
        //             left: 0,
        //             right: 0, // 25,
        //             bottom: 0,
        //             top: 0 // 25
        //         }
        //     },
        //     tooltips: {
        //         enabled: true
        //     },
        //     scales: {
        //         xAxes: [{
        //             scaleLabel: {
        //                 display: true,
        //                 labelString: "Local Time (in UTC)"
        //             }
        //         }],
        //         yAxes: [{
        //             scaleLabel: {
        //                 display: true
        //             },
        //             ticks: {
        //                 beginAtZero: true
        //             }
        //         }]
        //     }
        // };