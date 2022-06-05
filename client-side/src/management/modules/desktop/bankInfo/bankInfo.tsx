import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Grid, Paper, styled, TextField} from "@mui/material";
import avatar from "../../../../ressources/avatar.png";
import Grow from "@mui/material/Grow/Grow";
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

export const BankInfo = (props : any) => {

    const [model, setModel] = useState(null);


    return (

        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(true ? { timeout: 1000 } : {})}
        >
            <Paper sx={{ height: '100%' }} elevation={4}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                >
                    <Box className="userDetailsInfo p-3">{'Information personnelles'}</Box>
                    <Alert className="w-20 h-40 mt-2" style={{ marginLeft: "223px" }} icon={false} severity="info"><EditIcon/></Alert>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    style={{ marginLeft: "10px" }}
                >
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                    >
                        <LocationOnIcon/><Box className="userDetails p-2">{'Né le 12/02/1996'}</Box>
                    </Grid>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                    >
                        <EmailIcon/><Box className="userDetails px-3 p-2">{'12 rue le roi'}</Box>
                    </Grid>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                    >
                        <CallIcon/><Box className="userDetails px-3 p-2">{'12 rue le roi'}</Box>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                >

                </Grid>
            </Paper>
        </Grow>
    );

};
export default BankInfo ;