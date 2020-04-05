import React from 'react';
import { Grid } from '@material-ui/core';

import Header from './Header';
import Map from '../Map';



const WebView: React.FC = () => {
    return (
        <>
        <Header />
        <Grid container>
            <Grid item xs={3}>

            </Grid>
            <Grid item xs={6}>
                <Map />
            </Grid>
            <Grid item xs={3}>
                
            </Grid>
        </Grid>
        </>
    )
}

export default WebView;