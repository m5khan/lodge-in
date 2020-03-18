import React from 'react';
import { LocationData, BookLocationData } from '../services/MapService';
import { api } from '../services/ApiClient';
import '../styles/BookingDialog.css';

type Props = {
    showConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>,
    locationData: LocationData | null
}

let dayBuffer = 'Monday' // default value;

const BookingDialog = (props: Props) => {
    return (
        <div className='BookingDialog'>
            <div className='BookingDialogForm'>
            <span className='BookCloseDialog' onClick={() => {props.showConfirmDialog(false)}}>&times;</span>
                <div className='BookingFormContainer'>
                <label htmlFor="day-select">Select Booking Day</label>
                <select onChange={onSelectHandler} name="Days" id="day-select">
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thrusday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                </select>
                <button className='BookConfirm' onClick={()=>{ConfirmBookingHandler(props)}}>Book Property</button>
                </div>
            </div>
        </div>
    )
}

const ConfirmBookingHandler = async (props: Props) => {
    props.showConfirmDialog(false);
    const bookData: BookLocationData = {...props.locationData, day: dayBuffer} as BookLocationData;
    await api.bookProperty(bookData);
}

const onSelectHandler = (e: any) => {
    dayBuffer = e.target.value;
    
}

export default BookingDialog;