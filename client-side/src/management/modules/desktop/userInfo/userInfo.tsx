import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Grid, Paper, styled, TextField} from "@mui/material";
import avatar from "../../../../ressources/avatar.png";
import Grow from "@mui/material/Grow/Grow";
import './userInfo.css'
import {useDispatch, useSelector} from 'react-redux' ;
import {findPrismic, findPrismicDataInfo} from "../../redux/prismic/prismicActions";
import {connect} from 'react-redux'
import {findPrismicDatas} from "../../redux/prismic/api/prismicApi";

export const UserInfo = (props : any) => {

    const [model, setModel] = useState(null);

    const data = useSelector<any>(state => state.prismic.prismicData) ;
    const dataConf = useSelector<any>(state => state.globalConfig.globalConfData) ;

    const dispatch = useDispatch();

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
                    <Box className="userFullName p-3">{'Jules du pont'}</Box>
                    <Alert className="w-30 h-50 mt-2" style={{ marginLeft: "150px" }} severity="success">Adhésion valide</Alert>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    direction="column"
                >
                    <Box className="userDetails px-3">{'Né le 12/02/1996'}</Box>
                    <Box className="userDetails px-3 p-2">{'12 rue le roi'}</Box>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    className="p-2"
                >

                    <Button style={{ width: "75%" }}  variant="contained" className="mt-1">Déclarer un sinistres</Button>
                    <Button style={{ width: "75%" }}  variant="outlined" className="mt-1" onClick={()=> {console.log('sssss',dataConf)}}>Suivre mes sinistres</Button>
                    <Button style={{ width: "75%" }}  variant="contained" className="mt-1 bg-warning">Régler ma cotisation</Button>
                </Grid>
            </Paper>
        </Grow>
    );

};

const mapStatePrismic = (state:any) => {
    return {
        prismicData: state.prismicData
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        findPrismic: () => dispatch(findPrismic())
    }
}

export default UserInfo ;