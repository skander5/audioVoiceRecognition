import HomeDesktop from "../../desktop/home/home";
import {default as React, useEffect} from "react";
import {
    AppBar,
    Box, Button,
    Divider,
    Drawer, Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Paper,
    Toolbar
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {prismicCardSearch, prismicSelector} from "../../../modules/redux/prismic/selectors";
import '../layout/layout.css';
import {findGlobalConfig} from "../../../modules/redux/globalConfig/globalConfigActions";
import {findPrismicDataInfo} from "../../../modules/redux/prismic/prismicActions";
import '../home/home.css' ;
import avatar from "../../../../ressources/avatar.png"

export const HomeMobile = () => {

    const prismicData = useSelector<any>(state => state.prismic.prismicData) ;
    const dataConf = useSelector<any>(state => state.globalConfig.globalConfData) ;
    const dispatch = useDispatch();

    const prismicDatarr = prismicSelector(prismicData,dataConf) ;
    const cardInfo = prismicCardSearch(prismicData,dataConf);

    const [open, setOpen] = React.useState(false);

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
        <div className="mobileContainer">
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
            <Box className="p-5 mobile-page-routes d-flex justify-content-center" sx={{ width: open ? `calc(100% - 240px)` : '100%', marginLeft: open ? `240px` : '0%',}}>
                <Paper sx={{ height: '20%',width : "100%" }} elevation={4}>
                    <Grid container style={{ height: "100%" }}>
                        <Grid item container direction="row" alignItems="center" xs={6} style={{ height: "100%"}}>
                            <Grid item xs={3} alignItems="center" container style={{ height: "100%"}}>
                                <img className="pl-1" src={cardInfo?.url} style={{ height: "100%" }}/>
                            </Grid>

                        </Grid>
                        <Grid item xs={6} style={{ height: "100%" }} container direction="row" alignItems="center" justifyContent="center">
                            <Button style={{ width: "75%" }}  variant="contained" className="mt-1">Consulter l'adhésion</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
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
                <List>
                    {['Gestion Adhésion', 'Gestion sinistre', 'Gestion prestation', 'Documents'].map((text, index) => (
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