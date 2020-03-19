import React , { createContext, useState } from 'react';
import { LocationData } from '../services/MapService';

/**
 * LocationContext provides the locationData state and updateLocationData handle
 * locationData holds the information about the selected location.
 * This objects is set by the MapService when the marker is clicked
 */

interface ContextValue {
    locationData: LocationData | null;
    updateLocationData: (data:LocationData)=> void
}

export const LocationContext: React.Context<ContextValue> = createContext({} as ContextValue);

const LocationContextProvider = (props:any) => {

    const [locationData, setLocationData] =  useState<LocationData| null>(null);
    
    const updateLocationData = (data: LocationData) => {
        setLocationData(data);
    }

    return (
        <LocationContext.Provider value={{locationData, updateLocationData}}>
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationContextProvider;