import React from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
    padding: 0 3px;
    height: 100%;

    .paper {
        height: 100%;
    }
`;

const RightPane: React.FC = () => {
    return (
        <Container>
            <Paper className='paper' elevation={3} square>
            
            </Paper>
        </Container>
    )
}

export default RightPane;