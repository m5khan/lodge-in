import React, { useContext, useEffect } from 'react';

import { LocationContext } from '../../context/LocationContext';
import { BookingContext } from '../../context/BookingContext';
import { LocationData } from '../../services/MapService';
import { api } from '../../services/ApiClient';
import ScrollPane from './ScrollPane';
import PropertyDetail from './PropertyDetail';

type Props = {
    height: number;
}

const LeftPane: React.FC<Props> = (props: Props) => {
    const locationData: LocationData|null = useContext(LocationContext).locationData;
    const { setBookingData } = useContext(BookingContext);

    useEffect(() => {
        if(locationData) {
            api.getPropertyBookings(locationData.id)
            .then((result: any[]) => {
                setBookingData(result);
            })
            .catch(err => console.error(err));
        }
        return () => {
            setBookingData([]);
        }
    }, [locationData])

    return (
        <ScrollPane height={props.height}>
            {locationData ? <PropertyDetail {...locationData}/> : ''}
        </ScrollPane>
    )
}

export default LeftPane;