import React from 'react';
import { styled } from '@mui/material/styles';
//import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'



const Input = styled('input')({
  display: 'none',
});

const name="John Arney";
const email="john@gmail.com";
const mobile="9980917829";
const password="abc@123";

const Profile = () => {

  return (
    <div>
        <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={12}
        justifyContent="center"
      >
          </Stack>
        {/* <Avatar
        alt="John Arney"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 200, height: 200 }}
      />
    </Stack>
    <Stack
        sx={{ pt: 1}}
        direction="row"
        spacing={20}
        justifyContent="center"
      >
    <label htmlFor="icon-button-file">
  <Input accept="image/*" id="icon-button-file" type="file" />
  <IconButton color="primary" aria-label="upload picture" component="span">
    <PhotoCamera />
  </IconButton>
</label> /}
</Stack>
      {/ <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      /> */}
      <Stack
        sx={{ pt: 1}}
        direction="row"
        spacing={20}
        justifyContent="center"
      >
      <div>

        <p>Name : <TextField
          required
          id="standard-required"
          defaultValue={name}
          variant="standard"
        /></p>

        <p>Email : <TextField
          required
          id="standard-required"
          defaultValue={email}
          variant="standard"
        /></p>
        <p>Password : <TextField
          required
          id="standard-required"
          defaultValue={password}
          variant="standard"
        /></p>
        <p>Mobile : <TextField
          required
          id="standard-required"
          defaultValue={mobile}
          variant="standard"
        /></p>
        <Stack>
          <button>Update Profile</button>
          </Stack>

      </div>
      </Stack>
    </div>
  );
};
export default Profile;