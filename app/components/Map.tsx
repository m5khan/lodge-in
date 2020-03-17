import React, {useEffect, RefObject} from 'react';
import { MapService } from '../services/MapService';

import '../styles/Map.css';

let mapContainerElement: RefObject<HTMLDivElement> = React.createRef();

const MapComponent: React.FC = () => {
    
    useEffect(() => {
        const mapService:MapService = MapService.getInstance();
        mapService.initialize(mapContainerElement.current);
        return () => {
            mapService.terminate();
        }
        }, []); 
        
        return (
            <div id='mapContainer' className='MapContainer' ref={mapContainerElement}></div>
            )
        }
        
        export default MapComponent;