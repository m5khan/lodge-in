import React, { useState } from 'react';
import MapComponent from './Map';
import BookingPanel from './BookingPanel';
import LocationContextProvider from '../context/LocationContext';

import '../styles/App.css';

const App: React.FC = () => {
    const [sidePanel, showSidePanel] = useState(false);

    return(
        <div className='MainContainer'>
            <div className='Header'>
                <div className='Logo'>
                    <img src='/images/design_Limehome_Logo.svg' alt='limehome logo'/>
                </div>
                <div className='Burger' onClick={()=>{showSidePanel(!sidePanel)}}></div>
            </div>
            <LocationContextProvider>
                <MapComponent/>
                {sidePanel ? <BookingPanel/> : ''}
            </LocationContextProvider>
        </div>
        )
    }
    
    export default App;