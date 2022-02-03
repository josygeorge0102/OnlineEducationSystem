import React from 'react'
// import Appbar from './Appbar';
import ImgMediaCard from './ImgMediaCard';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function StudentClassroom() {
  const navigate = useNavigate();
  // const classes=useStyles();
    return (
        <div>
            <AppBar>
              <Toolbar>
                <Typography variant="h6">Online Classroom</Typography>
                <Button color='inherit' >Stream</Button>
                <Button color='inherit' onClick={() => navigate("Test")}>Test</Button>
              </Toolbar>
            </AppBar>
          <Box
          component="div"
          sx={{
            whiteSpace: 'nowrap',
            overflowX: 'auto',
            my: 2,
            p: 1,
            fontSize: '0.875rem',
            fontWeight: '700',
          }}
        ></Box>
        <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={12}
        justifyContent="center"
      >
     <ImgMediaCard></ImgMediaCard>
     </Stack>
        </div>
    )
}

export default StudentClassroom;
