import React, { createContext, useState } from 'react';
import { BookedData } from '../services/MapService';

type ContextState = {
    bookingData: any[];
    setBookingData: React.Dispatch<React.SetStateAction<any[]>>
}

const BookingContext = createContext({} as ContextState);

const BookingContextProvider = (props: any) => {
    const [bookingData, setBookingData] = useState<BookedData[]>([]);

    return (
        <BookingContext.Provider value={{bookingData: bookingData, setBookingData: setBookingData}}>
            {props.children}
        </BookingContext.Provider>
    )
}

export { BookingContext };
export default BookingContextProvider;