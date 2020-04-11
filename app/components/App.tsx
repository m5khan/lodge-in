import React from 'react';
import { Hidden } from '@material-ui/core';
import MobileView from './mobile/MobileView';
import LocationContextProvider from '../context/LocationContext';
import BookingContextProvider from '../context/BookingContext';
import WebView from './web/WebView';


const App: React.FC = () => {

    return(
       <> 
       <LocationContextProvider>
           <BookingContextProvider>
                <Hidden mdUp>
                    <MobileView />
                </Hidden>
                <Hidden smDown>
                    <WebView />
                </Hidden>
           </BookingContextProvider>
        </LocationContextProvider>
        </>
        )
    }
    
    export default App;