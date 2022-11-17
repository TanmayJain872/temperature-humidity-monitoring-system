/* jshint esversion: 11 */

import React from "react";
import { Box, TextField } from "@mui/material";

const TimePeriodSelector = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "62vw", margin: "auto" }}>
            <TextField 
                id="initialTimeStamp"
                label="Initial Date and Time"
                type="datetime-local"
            />
            <TextField 
                id="finalTimeStamp"
                label="Final Date and Time"
                type="datetime-local"
            />
        </Box>
    )
}

export default TimePeriodSelector;