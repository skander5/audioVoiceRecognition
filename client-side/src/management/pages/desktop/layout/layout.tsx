import React, {useEffect, useState} from "react";
import {SpbNavbar} from "../nav-bar/NavBar";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import avatar from "../../../../ressources/avatar.png";
import './layout.css';

export const LayoutDesktop = (props : any) => {

    const [model, setModel] = useState(null);

    return (

        <div>
            {/*<SpbNavbar/>*/}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <img src={avatar} className="logoImage"/>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <props.children />
        </div>
    );

};
export default LayoutDesktop ;


