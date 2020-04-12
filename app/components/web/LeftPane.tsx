import React, { useContext, useEffect, useState } from 'react';

import { LocationContext } from '../../context/LocationContext';
import { BookingContext } from '../../context/BookingContext';
import { LocationData } from '../../services/MapService';
import { api } from '../../services/ApiClient';
import ScrollPane from './ScrollPane';
import PropertyDetail from './PropertyDetail';
import BookingDialog from './BookingDialog';

type Props = {
    height: number;
}


const LeftPane: React.FC<Props> = (props: Props) => {
    const locationData: LocationData|null = useContext(LocationContext).locationData;
    const { setBookingData } = useContext(BookingContext);
    const [ openDialog, setOpenDialog ] = useState<boolean>(false);

    useEffect(() => {
        let ignore = false;
        if(locationData) {
            api.getPropertyBookings(locationData.id)
            .then((result: any[]) => {
                if (!ignore) {      
                    // ignore flag lets only the latest render update to set data in booking state
                    setBookingData(result);
                }
            })
            .catch(err => console.error(err));
        }
        return () => {
            ignore = true;
            setBookingData([]);
        }
    }, [locationData])

    return (
        <>
        <ScrollPane height={props.height}>
            {locationData ? <PropertyDetail {...locationData} setOpenDialog={setOpenDialog}/> : ''}
        </ScrollPane>
        {openDialog ? <BookingDialog open={openDialog} setOpenDialog={setOpenDialog} /> : ''}
        </>
    )
}


export default LeftPane;