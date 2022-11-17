/* jshint esversion: 11 */

import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, InputAdornment, TextField, Typography } from "@mui/material";

const MostRecentDataDisplayer = () => {

    const [currentTimeStamp, setCurrentTimeStamp] = useState(new Date().toString().substring(0, 24));
    const [currentValueOfTemperature, setCurrentValueOfTemperature] = useState(0);
    const [currentValueOfRelativeHumidity, setCurrentValueOfRelativeHumidity] = useState(0);

    useEffect(() => {
        setTimeout(async () => {
            setCurrentTimeStamp(new Date().toString().substring(0, 24));
            let response = await fetch("http://localhost:3005/api/temperature-humidity/recent-data/");
            let recentMeasurement = await response.json();
            setCurrentValueOfTemperature(recentMeasurement.Temperature);
            setCurrentValueOfRelativeHumidity(recentMeasurement.RelativeHumidity);
        }, 1000);
    }, [currentTimeStamp]);

    return (
        // <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 2 }}>
        // style={{ justifyContent: "space-between", width: "60vw", margin: "auto" }}
        <div>
            <h1 style={{textAlign: "center"}}> {currentTimeStamp} </h1>
            <br />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="h6">
                    Temperature: <TextField 
                                    size="small" 
                                    value={currentValueOfTemperature}
                                    InputProps={{ 
                                        readOnly: true,
                                        endAdornment: <InputAdornment position="end">°C</InputAdornment>
                                    }} 
                                    sx={{ width: "90px" }} 
                                />
                </Typography>
                <Typography variant="h6">
                    Relative Humidity: <TextField 
                                        size="small" 
                                        value={currentValueOfRelativeHumidity}
                                        InputProps={{ 
                                            readOnly: true,
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                                        }} 
                                        sx={{ width: "90px" }} 
                                    />
                </Typography>
            </Box>
        </div>
    )
}

export default React.memo(MostRecentDataDisplayer);