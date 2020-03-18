import React, { RefObject, useEffect, useContext, useState } from 'react';
import { MapService } from '../services/MapService';
import DetailCard from './DetailCard';
import BookingDialog from './BookingDialog';
import { LocationContext } from '../context/LocationContext';

import '../styles/Map.css';

// type Props = {
//     setLocData: React.Dispatch<React.SetStateAction<LocationData | null>>;
// }

let mapContainerElement: RefObject<HTMLDivElement> = React.createRef();

const MapComponent: React.FC = () => {
    const {locationData, updateLocationData} = useContext(LocationContext);
    const [confirmDialig, showConfirmDialog] = useState(false);
    
    useEffect(() => {
        const mapService:MapService = MapService.getInstance();
        mapService.initialize(mapContainerElement.current, updateLocationData);
        return () => {
            mapService.terminate();
        }
        }, []); 
        
        return (
            <>
                <div id='mapContainer' className='MapContainer' ref={mapContainerElement}>
                    {confirmDialig ? <BookingDialog showConfirmDialog={showConfirmDialog} /> : ''}
                    <DetailCard locationData={locationData} showConfirmDialog={showConfirmDialog}/>
                </div>
            </>
            
            )
        }
        
        export default MapComponent;