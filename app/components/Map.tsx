import React, { RefObject, useEffect, useContext } from 'react';
import { MapService } from '../services/MapService';
import DetailCard from './DetailCard';
import { LocationContext } from '../context/LocationContext';

import '../styles/Map.css';

// type Props = {
//     setLocData: React.Dispatch<React.SetStateAction<LocationData | null>>;
// }

let mapContainerElement: RefObject<HTMLDivElement> = React.createRef();

const MapComponent: React.FC = () => {
    const {locationData, updateLocationData} = useContext(LocationContext);
    
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
                    <DetailCard locationData={locationData}/>
                </div>
            </>
            
            )
        }
        
        export default MapComponent;