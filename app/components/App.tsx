import React, { useState } from 'react';
import { Hidden } from '@material-ui/core';

import MapComponent from './Map';
import BookingPanel from './BookingPanel';
import LocationContextProvider from '../context/LocationContext';
import WebView from './web/WebView';

import '../styles/App.css';

const App: React.FC = () => {
    const [sidePanel, showSidePanel] = useState(false);

    return(
       <> 
       <Hidden mdUp>
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
        </Hidden>
        <Hidden smDown>
            <LocationContextProvider>
                <WebView />
            </LocationContextProvider>
        </Hidden>
        </>
        )
    }
    
    export default App;