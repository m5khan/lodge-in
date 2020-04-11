import React, { useContext } from 'react';
import styled from 'styled-components';

import { LocationContext } from '../../context/LocationContext';
import { LocationData } from '../../services/MapService';
import PropertyDetail from './PropertyDetail';


const StyledPane = styled.div`
    max-height: ${(props: Props) => `${props.height}px`};
    overflow: auto;
    &::-webkit-scrollbar {
        width: 8px;
      }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

    &::-webkit-scrollbar-thumb {
        background: #888;
      }
`;

type Props = {
    height: number;
}

const LeftPane: React.FC<Props> = (props: Props) => {
    const locationData: LocationData|null = useContext(LocationContext).locationData;

    return (
        <StyledPane {...props}>
            {locationData ? <PropertyDetail {...locationData}/> : ''}
        </StyledPane>
    )
}

export default LeftPane;