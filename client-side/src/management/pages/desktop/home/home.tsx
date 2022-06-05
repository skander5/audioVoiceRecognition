import {default as React, useEffect, useState} from "react";
import {Button, Container, Grid, Paper, styled, TextField} from "@mui/material";
import avatar from "../../../../ressources/avatar.png";
import Grow from "@mui/material/Grow/Grow";
import Box from "@mui/material/Box";
import UserInfo from "../../../modules/desktop/userInfo/userInfo";
import SubscriptionInfo from "../../../modules/desktop/subsciptionInfo/subcriptionInfo";
import UserDetails from "../../../modules/desktop/userDetails/userDetails";
import BankInfo from "../../../modules/desktop/bankInfo/bankInfo";

export const HomeDesktop = () => {

    const [model, setModel] = useState(null);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height : '100%',
    }));

    return (
        <div className="d-flex flex-row justify-content-center align-items-center mt-5 container">
            <Grid container spacing={2}>

                    <Grid item xs={6} style={{ height: "690px" }}>
                        <Grid container spacing={3} style={{ height: "100%" }}>
                            <Grid item xs={12}>
                                <UserInfo/>
                            </Grid>
                            <Grid item xs={12} >
                                <UserDetails />
                            </Grid>
                            <Grid item xs={12}>
                                <BankInfo />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid style={{ height: "100%" }}>
                            <SubscriptionInfo/>
                        </Grid>
                    </Grid>
            </Grid>
        </div>
    );

};
export default HomeDesktop ;