import React, { useState } from 'react';
import LocationContextProvider from '../../context/LocationContext';
import MapComponent from '../Map';
import BookingPanel from './BookingPanel'


const MobileView: React.FC = () => {

    const [sidePanel, showSidePanel] = useState(false);

    return (
        <React.Fragment>
            <div className='MainContainer'>
                <div className='Header'>
                    <div className='Logo'>
                        Lodge-In
                    </div>
                    <div className='Burger' onClick={()=>{showSidePanel(!sidePanel)}}></div>
                </div>
                <LocationContextProvider>
                    <MapComponent/>
                    {sidePanel ? <BookingPanel/> : ''}
                </LocationContextProvider>
            </div>
        </React.Fragment>
    )
}

export default MobileView;