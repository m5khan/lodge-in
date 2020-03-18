import React from 'react';
import MapComponent from './Map';
import LocationContextProvider from '../context/LocationContext';

import '../styles/App.css';

const App: React.FC = () => {

    return(
        <div className='MainContainer'>
            <div className='Header'>
                <div className='Logo'>
                    <img src='/images/design_Limehome_Logo.svg' alt='limehome logo'/>
                </div>
                <div className='Burger'></div>
            </div>
            <LocationContextProvider>
                <MapComponent/>
            </LocationContextProvider>
        </div>
        )
    }
    
    export default App;