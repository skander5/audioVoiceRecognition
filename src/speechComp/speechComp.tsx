import * as React from 'react';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import './speechComp.css'
import {useEffect} from "react";
import {useState} from "react";


export const SpeechCom = (props:any) => {

    const icon = (
        <Paper sx={{ m: 1 }} elevation={4}>
            <Box component="svg" sx={{ width: 100, height: 100 }}>
                <Box
                    component="polygon"
                    sx={{
                        fill: (theme: Theme) => theme.palette.common.white,
                        stroke: (theme) => theme.palette.divider,
                        strokeWidth: 1,
                    }}
                    points="0,100 50,00, 100,100"
                />
            </Box>
        </Paper>
    );

    const label = (<h1>{props.word}</h1>) ;

    const [checked, setChecked] = React.useState(false);
    const [show, setShow] = useState(true);

    const showHide = () => {
        setShow((prev) => !prev);
    }

    const handleChange = () => {
            setChecked((prev) => !prev);
            setShow((prev) => !prev);
            //setTimeout(showHide, 1000);
    };


    const changeAfterSec = async () =>{
        await delay(2000);
    }

    function delay(time:any) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    useEffect(() => {
        console.log('changed',props.word);
        //setChecked((prev) => !prev);
        //handleChange();
        //changeAfterSec();
    },[props.word]);

    return(
        <>
            <Box sx={{ display: 'flex',justifyContent: 'center',flexDirection:'column',ml:67}}>
                <Box>
                    <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} />}
                        label="Show"
                    />
                </Box>
                <Box>
                    <Grow in={show} style={{ transformOrigin: '0 0 0' }} {...(show ? { timeout: 1000 } : {})}>
                        {label}
                    </Grow>
                </Box>
            </Box>
            <Box id="visualizer-container" sx={{ display: 'flex',justifyContent: 'center'}}>
                <canvas id="output" width="400" height="200"></canvas>
            </Box>
        </>
    );
};
export default SpeechCom ;