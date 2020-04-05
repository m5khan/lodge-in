import React, { useState, useContext } from 'react';
import { LocationContext } from '../../context/LocationContext';
import MapComponent from '../Map';
import BookingPanel from './BookingPanel'
import DetailCard from './DetailCard';
import BookingDialog from './BookingDialog';


const MobileView: React.FC = () => {

    const [sidePanel, showSidePanel] = useState(false);
    const { locationData } = useContext(LocationContext);
    const [confirmDialig, showConfirmDialog] = useState(false);

    return (
        <React.Fragment>
            <div className='MainContainer'>
                <div className='Header'>
                    <div className='Logo'>
                        Lodge-In
                    </div>
                    <div className='Burger' onClick={()=>{showSidePanel(!sidePanel)}}></div>
                </div>
                <MapComponent>
                    {confirmDialig ? <BookingDialog showConfirmDialog={showConfirmDialog} locationData={locationData} /> : ''}
                    <DetailCard locationData={locationData} showConfirmDialog={showConfirmDialog}/>
                </MapComponent>
                {sidePanel ? <BookingPanel/> : ''}
            </div>
        </React.Fragment>
    )
}

export default MobileView;