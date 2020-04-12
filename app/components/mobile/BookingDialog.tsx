import React from 'react';
import { LocationData, BookLocationData } from '../../services/MapService';
import { api } from '../../services/ApiClient';
import '../../styles/BookingDialog.css';

type Props = {
    showConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>,
    locationData: LocationData | null
}

let dayBuffer:number = 1 // default value;

const BookingDialog = (props: Props) => {
    return (
        <div className='BookingDialog'>
            <div className='BookingDialogForm'>
            <span className='BookCloseDialog' onClick={() => {props.showConfirmDialog(false)}}>&times;</span>
                <div className='BookingFormContainer'>
                <label htmlFor="day-select">Select Guests</label>
                <select onChange={onSelectHandler} name="Days" id="day-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <button className='BookConfirm' onClick={()=>{ConfirmBookingHandler(props)}}>Book Property</button>
                </div>
            </div>
        </div>
    )
}

const ConfirmBookingHandler = async (props: Props) => {
    props.showConfirmDialog(false);
    const bookData: BookLocationData = {...props.locationData, guests: dayBuffer} as BookLocationData;
    await api.bookProperty(bookData);
}

const onSelectHandler = (e: any) => {
    dayBuffer = parseInt(e.target.value);
    
}

export default BookingDialog;