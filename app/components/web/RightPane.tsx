import React, { useContext } from 'react';
import ScrollPane from './ScrollPane';
import { BookingContext } from '../../context/BookingContext';
import Unavailable from './Unavailable';
import BookingList from './BookingList';

type Props = {
  height: number;
}

const RightPane: React.FC<Props> = (props: Props) => {
  const bookingData = useContext(BookingContext).bookingData;
  
  return (
    <>
    {bookingData && bookingData.length ?
      <ScrollPane height={props.height}>
        <BookingList bookings={bookingData}/>
      </ScrollPane>
      : 
      <Unavailable />  
    }
    </>
    )
  }
  
  export default RightPane;