import React, {useContext, useEffect, useState } from 'react';
import { LocationContext } from '../../context/LocationContext';
import { api } from '../../services/ApiClient';
import { BookLocationData } from '../../services/MapService';

import '../../styles/BookingPanel.css';

const BookingPanel: React.FC = () => {
    const {locationData} = useContext(LocationContext);
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        if(locationData?.id) {
            api.getPropertyBookings(locationData.id)
            .then((bookings: any) => {
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

const bookingLi = (bookings: BookLocationData[]) => {
    return (
        bookings.map((item: BookLocationData, index: number) => {
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