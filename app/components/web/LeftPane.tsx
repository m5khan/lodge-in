import React, { useContext } from 'react';
import styled from 'styled-components';

import { LocationContext } from '../../context/LocationContext';
import { LocationData } from '../../services/MapService';
import PropertyDetail from './PropertyDetail';


const Container = styled.div`
    height: 100%;
`;

const LeftPane: React.FC = () => {
    const locationData: LocationData|null = useContext(LocationContext).locationData;

    return (
        <Container>
            {locationData ? <PropertyDetail {...locationData}/> : ''}
        </Container>
    )
}

export default LeftPane;