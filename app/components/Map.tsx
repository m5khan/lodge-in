import React, { RefObject, useEffect, useContext } from 'react';
import { MapService } from '../services/MapService';
import styled from 'styled-components';
import { LocationContext } from '../context/LocationContext';

const MapContainer = styled.div`
    width: ${(props: Props) => props.mobile ? '320px' : '100%'};
    height: ${(props: Props) => props.mobile ? '480px' : `${window.innerHeight - 64 }px`};
    position: relative;
`;

// type Props = {
//     setLocData: React.Dispatch<React.SetStateAction<LocationData | null>>;
// }

type Props = {
    mobile?: boolean | undefined;
    children?: (string | JSX.Element )[];
}

let mapContainerElement: RefObject<HTMLDivElement> = React.createRef();

const MapComponent: React.FC<Props> = (props: Props) => {
    const { updateLocationData } = useContext(LocationContext);
    
    
    useEffect(() => {
        const mapService:MapService = new MapService();
        mapService.initialize(mapContainerElement.current, updateLocationData);
        return () => {
            mapService.terminate();
        }
        }, []); 

        return (
                <MapContainer {...props} id='mapContainer' className='MapContainer' ref={mapContainerElement}>
                    {props.children}
                </MapContainer>
            )
        }
        
        export default MapComponent;