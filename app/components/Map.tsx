import React, { RefObject, useEffect, useContext, useState } from 'react';
import { MapService } from '../services/MapService';
import styled from 'styled-components';
import DetailCard from './DetailCard';
import BookingDialog from './BookingDialog';
import { LocationContext } from '../context/LocationContext';

import '../styles/Map.css';

const MapContainer = styled.div`
    width: ${(props:any) => props.mobile ? '320px' : '100%'};
    height: 480px;
    position: relative;
`;

// type Props = {
//     setLocData: React.Dispatch<React.SetStateAction<LocationData | null>>;
// }

type Props = {
    mobile?: boolean;
}

let mapContainerElement: RefObject<HTMLDivElement> = React.createRef();

const MapComponent: React.FC<Props> = (props: Props) => {
    const {locationData, updateLocationData} = useContext(LocationContext);
    const [confirmDialig, showConfirmDialog] = useState(false);
    
    useEffect(() => {
        const mapService:MapService = new MapService();
        mapService.initialize(mapContainerElement.current, updateLocationData);
        return () => {
            mapService.terminate();
        }
        }, []); 
        
        return (
            <>
                <MapContainer {...props} id='mapContainer' className='MapContainer' ref={mapContainerElement}>
                    {confirmDialig ? <BookingDialog showConfirmDialog={showConfirmDialog} locationData={locationData} /> : ''}
                    <DetailCard locationData={locationData} showConfirmDialog={showConfirmDialog}/>
                </MapContainer>
            </>
            
            )
        }
        
        export default MapComponent;