import React from 'react';

import '../styles/DetailCard.css';

const DetailCard: React.FC = () => {
    return (
        <div className='DetailCard'>
            <div className='ImagePanel'>
                <img className='ImgBox' src='/images/livingroom.jpg' alt='limehome property for booking or renting'></img>
            </div>
            <div className='DetailPanel'></div>
            <div className='BookButtonSection'>
                <button onClick={(e) => {e.preventDefault()}} className='BookButton'>Book</button>
            </div>
        </div>
    )
}

export default DetailCard;