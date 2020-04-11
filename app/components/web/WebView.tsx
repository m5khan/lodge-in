import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import Header from './Header';
import Map from '../Map';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

// Default css for web
import '../../styles/web.css';

const Container = styled.div`
    max-height: ${`${window.innerHeight - 64 }px`};
`;



const WebView: React.FC = () => {
    return (
        <>
        <Header />
        <Container>
            <Grid container>
                <Grid item xs={3}>
                    <LeftPane />
                </Grid>
                <Grid item xs={6}>
                    <Map />
                </Grid>
                <Grid item xs={3}>
                    <RightPane /> 
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default WebView;