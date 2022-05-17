import * as React from 'react';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import './speechComp.css'
import {useEffect} from "react";


export const SpeechCom = () => {

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

    const label = (<h1>OK</h1>) ;

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
            setChecked((prev) => !prev);
    };

    const startListening = () =>{

    }

    useEffect(() => {

    },[]);

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
                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})}>
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