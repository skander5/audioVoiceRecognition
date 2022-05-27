import * as React from "react";
import FacialRecognition from "../facialRecognition";
import SpeechCom from "../speechComp/speechComp";
import './authenticate.css';
import Grow from "@mui/material/Grow/Grow";
import Box from "@mui/material/Box";
import {Button, Grid, Paper, TextField} from "@mui/material";
import { Theme } from '@mui/material/styles';
import {useEffect} from "react";
import avatar from "../ressources/avatar.png"

export const Authenticate = (props:any) => {


    const [checked, setChecked] = React.useState(true);
    const [showAvatar, setShowAvatar] = React.useState(false);

    const start = () => {
        const facialRecognition = new FacialRecognition();
        facialRecognition.init(setShowAvatar);
    }

    useEffect(() => {
        start();
    },[]);

    useEffect(() => {
        console.log('changed',showAvatar);
    },[showAvatar]);

    return(
        <>
{/*          <div className="d-flex flex-row justify-content-center align-items-center">
                <h1>Authenticate</h1>
                <button onClick={start}>Start</button>
                <div id="webcam-container"></div>
                <div id="label-container"></div>

            </div>*/}
            <h1 className="text-center mt-5">Login</h1>
            <Box className="d-flex flex-row justify-content-center align-items-center mt-5">
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 1000 } : {})}
                >
                    <Paper sx={{ width: '30%',height: '600px' }} elevation={4}>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                        >
                            {!showAvatar && <div id="camera" className="camera mt-5"></div>}
                            {showAvatar && <img src={avatar} className="avatarImage mt-5"/>}
                            <TextField id="outlined-basic" label="Login" variant="outlined" className="mt-5" />
                            <TextField id="outlined-basic" label="Mot de passe" variant="outlined" className="mt-2"/>
                            <Button variant="contained" className="mt-4">Se connecter</Button>

                        </Grid>
                    </Paper>
                </Grow>
            </Box>
        </>
    );

};
export default Authenticate ;