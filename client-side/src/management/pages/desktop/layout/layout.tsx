import React, {useEffect, useState} from "react";
import {SpbNavbar} from "../nav-bar/NavBar";
import AppBar from '@mui/material/AppBar';
import Box, {BoxProps} from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import avatar from "../../../../ressources/avatar.png";
import './layout.css';
import {findPrismicDataInfo} from "../../../modules/redux/prismic/prismicActions";
import {useDispatch, useSelector} from "react-redux";
import {prismicSelector} from "../../../modules/redux/prismic/selectors";
import {findGlobalConfig} from "../../../modules/redux/globalConfig/globalConfigActions";
import InputBase from '@mui/material/InputBase';
import SearchBar from "../../../shared/component/searchBar";
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';


export const LayoutDesktop = (props : any) => {

    const [model, setModel] = useState(null);
    const dispatch = useDispatch();
    const prismicData = useSelector<any>(state => state.prismic.prismicData) ;
    const dataConf = useSelector<any>(state => state.globalConfig.globalConfData) ;

    const prismicDatarr = prismicSelector(prismicData,dataConf) ;


    useEffect(() => {
        console.log('ddcdcd');
        dispatch(findGlobalConfig());
        dispatch(findPrismicDataInfo());
    },[]);

    useEffect(() => {
        console.log(prismicDatarr);
    },[prismicData]);

    return (

        <div>
            {/*<SpbNavbar/>*/}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{backgroundColor:prismicDatarr?.color}}>
                    <Toolbar>
                        <img src={prismicDatarr?.logo} className="logoImage"/>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {dataConf?.product_group_label}
                        </Typography>
                        <SearchBar></SearchBar>
                        <Box sx={{
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                p: 0.8,
                                m: 0.8,
                                width: '2%',
                                height : '1%' ,
                                bgcolor: '#F7F9FC',
                                border: '1px solid',
                                borderColor:  'grey.300',
                                borderRadius: 2,
                                fontSize: '0.875rem',
                                fontWeight: '700',
                            }}>
                            <PersonOutlineTwoToneIcon className="personOutlineTwoToneIcon"></PersonOutlineTwoToneIcon>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
                <props.children />
        </div>
    );

};
export default LayoutDesktop ;


