import React from 'react';
import { Hidden } from '@material-ui/core';
import MobileView from './mobile/MobileView';
import LocationContextProvider from '../context/LocationContext';
import WebView from './web/WebView';


const App: React.FC = () => {

    return(
       <> 
       <LocationContextProvider>
       <Hidden mdUp>
            <MobileView />
        </Hidden>
        <Hidden smDown>
            <WebView />
        </Hidden>
        </LocationContextProvider>
        </>
        )
    }
    
    export default App;