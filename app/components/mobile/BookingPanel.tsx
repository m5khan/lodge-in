import React, {useContext, useEffect, useState } from 'react';
import { LocationContext } from '../../context/LocationContext';
import { api } from '../../services/ApiClient';
import { BookedData } from '../../services/MapService';

import '../../styles/BookingPanel.css';

const BookingPanel: React.FC = () => {
    const {locationData} = useContext(LocationContext);
    const [bookings, setBookings] = useState<BookedData[]>([]);
    
    useEffect(() => {
        if(locationData?.id) {
            api.getPropertyBookings(locationData.id)
            .then((bookings: BookedData[]) => {
                setBookings(bookings);
            }).catch((e) => console.error(e));
        }
    }, [locationData])

    return (
        <div className='BookingPanelParent' >
            <div className='BookingPanelContainer'>
                <div>
                    <h5>Bookings</h5>
                    <ul>
                    {bookings.length ? bookingLi(bookings) : <li><p>There are currently no bookings for this property</p></li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const bookingLi = (bookings: BookedData[]) => {
    return (
        bookings.map((item: BookedData, index: number) => {
            return (
                <li key={index}>
                    <b>{item.guests} guests</b>
                    {item.time ?  <p>{new Date(item.time).toTimeString()}</p> : ''}
                </li>
            )
        })
    )
}

export default BookingPanel;