import HomeDesktop from "../../desktop/home/home";
import {default as React, useEffect} from "react";
import { AppBar, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {prismicSelector} from "../../../modules/redux/prismic/selectors";
import '../layout/layout.css';
import {findGlobalConfig} from "../../../modules/redux/globalConfig/globalConfigActions";
import {findPrismicDataInfo} from "../../../modules/redux/prismic/prismicActions";

export const HomeMobile = () => {

    const prismicData = useSelector<any>(state => state.prismic.prismicData) ;
    const dataConf = useSelector<any>(state => state.globalConfig.globalConfData) ;
    const dispatch = useDispatch();

    const prismicDatarr = prismicSelector(prismicData,dataConf) ;

    const [open, setOpen] = React.useState(false);
console.log(prismicDatarr?.logo);
    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    useEffect(() => {
        console.log('ddcdcd');
        dispatch(findGlobalConfig());
        dispatch(findPrismicDataInfo());
    },[]);
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar sx={{ width: open ? `calc(100% - 240px)` : '100%', marginLeft: open ? `240px` : '0%',}} id="header" position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2 }}
                        edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <img src={prismicDatarr?.logo} className="app-logo-mobile"/>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton >
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </div>
    );
};

export default HomeMobile ;