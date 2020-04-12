import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import Header from './Header';
import Map from '../Map';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

// Default css for web
import '../../styles/web.css';

const maxHeight = window.innerHeight - 64;
const Container = styled.div`
    max-height: ${`${ maxHeight }px`};
    & .grid-right {
        border-left: 1px solid #dedede;
    }
    & .grid-left {
        border-right: 1px solid #dedede;
    }
`;



const WebView: React.FC = () => {
    return (
        <>
        <Header />
        <Container>
            <Grid container>
                <Grid className='grid-left' item xs={3}>
                    <LeftPane height={maxHeight}/>
                </Grid>
                <Grid item xs={6}>
                    <Map height={maxHeight}/>
                </Grid>
                <Grid className='grid-right' item xs={3}>
                    <RightPane height={maxHeight}/> 
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default WebView;