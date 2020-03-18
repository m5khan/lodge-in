import React, { RefObject, useEffect } from 'react';
import { MapService } from '../services/MapService';
import { LocationData } from '../services/MapService';
import DetailCard from './DetailCard';

import '../styles/Map.css';

type Props = {
    setLocData: React.Dispatch<React.SetStateAction<LocationData | null>>;
}

let mapContainerElement: RefObject<HTMLDivElement> = React.createRef();

const MapComponent: React.FC<Props> = (props: Props) => {
    
    useEffect(() => {
        const mapService:MapService = MapService.getInstance();
        mapService.initialize(mapContainerElement.current, props.setLocData);
        return () => {
            mapService.terminate();
        }
        }, []); 
        
        return (
            <>
                <div id='mapContainer' className='MapContainer' ref={mapContainerElement}>
                    <DetailCard />
                </div>
            </>
            
            )
        }
        
        export default MapComponent;