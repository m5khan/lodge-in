import React from 'react';

import '../styles/BookingDialog.css';

type Props = {
    showConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const BookingDialog = (props: Props) => {
    return (
        <div className='BookingDialog'>
            <div className='BookingDialogForm'>
            <span className='BookCloseDialog' onClick={() => {props.showConfirmDialog(false)}}>&times;</span>
                <div className='BookingFormContainer'>
                <label htmlFor="day-select">Select Booking Day</label>
                <select name="Days" id="day-select">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thrusday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                </select>
                <button className='BookConfirm' onClick={()=>{props.showConfirmDialog(false)}}>Book Property</button>
                </div>
            </div>
        </div>
    )
}

export default BookingDialog;