import 'date-fns';
import React, { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

type Props = {
    open: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookingDialog(props: Props): JSX.Element {

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const [guests, setGuests] = React.useState<number>(1);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
  
    const handleClose = () => {
        props.setOpenDialog(false);
    };

    const sliderCommit = (_e: ChangeEvent<{}>, val: number | number[])   => {
        if(val instanceof Array) {
            setGuests(val[0]);
        } else {
            setGuests(val);
        }
    }

    function valuetext(value: number) {
        return `${value}`;
    }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Book Estate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To book the property, please enter the details. 
            Please note that the submission of the form saves the data on our servers.
            This booking is only a prototype and does not actually book a property. 
          </DialogContentText>
          <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </DialogContent>
        <DialogContent>
        <Typography id="discrete-slider" gutterBottom>
            Number of Guests: {guests}
        </Typography>
        <Slider
            defaultValue={1}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            onChangeCommitted={sliderCommit}
        />
        <div></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </MuiPickersUtilsProvider>
  );
}
