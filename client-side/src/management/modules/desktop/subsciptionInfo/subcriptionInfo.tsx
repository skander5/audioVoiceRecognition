import React, {useEffect, useState} from "react";
import {
    Alert,
    Box,
    BoxProps,
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    styled,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import avatar from "../../../../ressources/avatar.png";
import Grow from "@mui/material/Grow/Grow";
import {CalendarToday, FolderOpen, Storefront} from "@mui/icons-material";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const SubscriptionInfo = (props : any) => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    function Item(props: BoxProps) {
        const { sx, ...other } = props;
        return (
            <Box
                sx={{
                    p: 4,
                    m: 4,
                    width: '70%',
                    height : '30%' ,
                    bgcolor: '#F0FAFF',
                    border: '1px solid',
                    borderColor:  'grey.300',
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                }}
                {...other}
            />
        );
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
                <Box sx={{ width: '100%',height: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Détails de l'adhésion" {...a11yProps(0)} />
                            <Tab label="Produit assuré" {...a11yProps(1)} />
                            <Tab label="Contact" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Grid
                            sx={{ height: '100%' }}
                            container
                            spacing={0}
                            alignItems="center"
                            justifyContent="center"
                            direction="row"
                        >
                        <Item>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                            >
                                <FolderOpen/>
                                <Box className="">{'Adhésion'}</Box>
                                <Box className="userDetails">{'12/09/2020'}</Box>
                            </Grid>
                        </Item>
                        <Item>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                            >
                                    <CalendarToday/>
                                <Box className="">{'Début de garantie'}</Box>
                                <Box className="userDetails">{'12/09/2020'}</Box>
                            </Grid>
                        </Item>
                            <Item>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                >
                                    <Storefront/>
                                    <Box className="">{'Magasin'}</Box>
                                    <Box className="userDetails">{'Magasin Lyon 12 rue le prince'}</Box>

                                </Grid>
                            </Item>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Produit assuré
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Contact
                    </TabPanel>
                </Box>
            </Paper>
        </Grow>
    );

};
export default SubscriptionInfo ;