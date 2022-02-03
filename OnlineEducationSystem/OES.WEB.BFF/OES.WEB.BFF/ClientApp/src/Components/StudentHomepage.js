import MediaCard from "./MediaCard";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function StudentHomepage() {
  const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
     setOpen(true);
   };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
    return (
        <div>
            <AppBar>
              <Toolbar>
                <Typography variant="h6" style={{flexGrow:1}} >Online Classroom</Typography>
                <Button color='inherit' onClick={() => navigate("Profile")}>Profile</Button>
                <Button color='inherit'>Logout</Button>
              </Toolbar>
            </AppBar>
            <br></br>
     <h2>Welcome student</h2>
     <br></br>
    
     <Button variant="contained" onClick={handleClickOpen}>
        Join class
      </Button>

     <MediaCard></MediaCard> 

     <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask your teacher for the classroom ID, then enter it here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class ID"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Join</Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}
export default StudentHomepage;