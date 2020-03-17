import React, {useEffect} from 'react';

import '../styles/Map.css';

const MapComponent: React.FC = () => {
    let platform = new H.service.Platform({
        'apikey': '6zhmzcvXH8-jk6sCareHPWl7MNxawc00aiO1dwyWSH8'
    });
    
    useEffect(() => {
        const defaultLayers = platform.createDefaultLayers();
        // Instantiate (and display) a map object:
        new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: { lat: 52.5, lng: 13.4 }
            });
            
        }, []); 
        
        return (
            <div id='mapContainer' className='MapContainer'></div>
            )
        }
        
        export default MapComponent;