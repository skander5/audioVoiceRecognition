import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Grid, Paper, styled, Tab, Tabs, TextField, Typography} from "@mui/material";
import avatar from "../../../../ressources/avatar.png";
import Grow from "@mui/material/Grow/Grow";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const SubscriptionInfo = (props : any) => {

    const [value, setValue] = useState();

    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }


    return (

        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0' }}
            {...(true ? { timeout: 1000 } : {})}
        >
            <Paper sx={{ height: '100%' }} elevation={4}>
                {/*<Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>*/}
            </Paper>
        </Grow>
    );

};
export default SubscriptionInfo ;