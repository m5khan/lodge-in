import React from 'react';
import styled from 'styled-components';
import { Box, Divider, Typography } from '@material-ui/core';
import MoodBadIcon from '@material-ui/icons/MoodBad';

const Container = styled.div`
padding: ${(props: cssProp) => props.pad}px;
margin-top: -90px;
`
type cssProp = {
    pad: number;
}

const Unavailable: React.FC = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" css={{ height: '100%' }}>
            
            <Container pad={30}>
                <MoodBadIcon style={{fontSize: '50px', width: '100%'}} color="action"></MoodBadIcon>
                <Typography align="center" variant="body1" gutterBottom paragraph color="textSecondary" component="p">
                    There are no bookings available for this property to show.
                </Typography>
                <Divider />
            </Container>
            
        </Box>
        );
}

export default Unavailable;