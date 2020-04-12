import React, { useContext } from 'react';
import ScrollPane from './ScrollPane';
import { BookingContext } from '../../context/BookingContext';


type Props = {
  height: number;
}

const RightPane: React.FC<Props> = (props: Props) => {
  const bookingData = useContext(BookingContext).bookingData;

  return (
    <ScrollPane height={props.height}>
      <p>
        {JSON.stringify(bookingData)};
      </p>
    </ScrollPane>
    )
  }
  
  export default RightPane;