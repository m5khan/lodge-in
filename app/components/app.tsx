import React, { useState } from 'react';
import MapComponent from './Map';
import { LocationData } from '../services/MapService';

import '../styles/App.css';

const App: React.FC = () => {

    const [locData, setLocData] =  useState<LocationData| null>(null);

    console.log(locData, 'render call');

    return(
        <div className='MainContainer'>
            <div className='Header'>
                <div className='Logo'></div>
                <div className='Burger'></div>
            </div>
            <MapComponent setLocData={setLocData}/>
        </div>
        )
    }
    
    export default App;