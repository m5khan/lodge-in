import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { BookedData } from '../../services/MapService';


const Container = styled.div`
padding: ${(props: cssProp) => props.pad}px;
`
type cssProp = {
    pad: number;
}

type Props = {
    bookings: BookedData[];
}

type ItemProps = {
    date: Date,
    guests: number;
}

const BookingList: React.FC<Props> = (props: Props) => {
    return (
        <Box>
            <Container pad={10}>
            <List>
                {
                props.bookings.map((booking: BookedData) => 
                    <BookingItem key={booking._id} date={new Date(booking.time)} guests={booking.guests}/>
                    //<div key={booking._id}>{BookingItem({date: new Date(booking.time), guests: booking.guests})}</div>
                )
                }
            </List>
            </Container>
        </Box>
    );
}


const BookingItem = (props: ItemProps) => {
    const text1 = `Booked for ${props.guests} guests`;

    return (
        <>
    <ListItem alignItems="flex-start">
        <ListItemText
        primary={text1}
        secondary={
            <React.Fragment>
            <Typography
                component="span"
                variant="body2"
                color="textPrimary"
            >
                {getDayText(props.date)}
            </Typography>
            {" — " + props.date.toTimeString()}
            </React.Fragment>
        }
        />
    </ListItem>
    <Divider component="li" />
    </>
    );
}

const getDayText = (date: Date): string => {
    const d: number = date.getDay();
    switch(d) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thrusday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default: return ''
    }
}

export default BookingList;