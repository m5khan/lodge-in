import React from 'react';
import { LocationData } from '../../services/MapService';

import '../../styles/DetailCard.css';

type Props = {
    locationData: LocationData | null;
    showConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const DetailCard: React.FC<Props> = (props:Props) => {
    const locData = props.locationData;
    return (
        (locData ? 
        <div className='DetailCard'>
            <div className='ImagePanel'>
                <img className='ImgBox' src='/images/livingroom.jpg' alt='limehome property for booking or renting'></img>
            </div>
            <div className='DetailPanel'>
                <div className='DetailContentBox'>
                    <h5>{locData.title}</h5>
                    <p>{locData.address.label}</p>
                </div>
            </div>
            <div className='BookButtonSection'>
                <button onClick={() => {props.showConfirmDialog(true)}} className='BookButton'>Book</button>
            </div>
        </div>
            : <></>)
    )
}

export default DetailCard;