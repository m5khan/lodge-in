import React from 'react';
import MapComponent from './Map';

import '../styles/App.css';

const App: React.FC = () => {
    return(
        <div className='MainContainer'>
            <div className='Header'>
                <div className='Logo'></div>
                <div className='Burger'></div>
            </div>
            <MapComponent />
        </div>
        )
    }
    
    export default App;