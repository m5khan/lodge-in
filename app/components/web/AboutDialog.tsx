import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AboutDialog(props: Props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"About"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Lodge-in search for nearby hotels on the map,
            provide its details and booking options. The responsive user interface handles both wide and smaller screens
            making it usable for both desktop and mobile based browsers.
            </DialogContentText>
            <DialogContentText>
            Lodge-in is a prototype fullstack Javascript web-application build with Node, Express, React, Typescript and MongoDB. 
            The source code is available on <Link href={"https://github.com/m5khan/lodge-in"} target="_blank" rel="noopener">Github</Link>.
            </DialogContentText>
            <Divider />
            <div style={{paddingTop: '15px'}}>
            <Typography variant="caption" color="textPrimary" component="p">
            <Link color="inherit" href={"https://github.com/m5khan"} target="_blank" rel="noopener"><GitHubIcon fontSize="large"></GitHubIcon></Link>
            <Link color="inherit" style={{marginLeft: '15px'}} href={"https://www.linkedin.com/in/shoaib-khan-65839687/"} target="_blank" rel="noopener"><LinkedInIcon fontSize="large"></LinkedInIcon></Link>
            </Typography>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Great!
          </Button>
        </DialogActions>
      </Dialog>
  );
}
