import React from "react";
import Stack from "@mui/material/Stack";
// import Button from '@mui/material/Button';

//import { DataGrid } from '@mui/x-data-grid';
import TextField from "@mui/material/TextField";
import { AppBar, Toolbar, Typography } from "@mui/material";

const name = "John Arney";
const email = "john@gmail.com";
const mobile = "9980917829";

const Profile = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Online Classroom
          </Typography>
        </Toolbar>
      </AppBar>
      <br></br>

      <h1>Profile Details</h1>
      <br></br>

      <Stack
        sx={{ pt: 1 }}
        direction="row"
        spacing={20}
        justifyContent="center"
      >
        <div>
          <p>
            Name :{" "}
            <TextField
              required
              id="standard-required"
              defaultValue={name}
              variant="standard"
            />
          </p>
          <br></br>
          <p>
            Email :{" "}
            <TextField
              required
              id="standard-required"
              defaultValue={email}
              variant="standard"
            />
          </p>
          <br></br>
          <p>
            Mobile :{" "}
            <TextField
              required
              id="standard-required"
              defaultValue={mobile}
              variant="standard"
            />
          </p>
          <br></br>
          <Stack>
            <button>Update Profile</button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};
export default Profile;
