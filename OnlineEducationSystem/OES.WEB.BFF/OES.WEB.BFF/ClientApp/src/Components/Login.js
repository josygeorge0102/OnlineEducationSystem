import React from 'react'
import {Button,TextField, Grid,Paper, Typography,Link as Materiallink} from '@material-ui/core'
import {Link} from 'react-router-dom';
import image1 from '../Assests/image1.jpg';
import { useLocation } from 'react-router-dom'
const Login=()=>{
    const paperStyle={padding:20,height:'70vh',width:300,margin:"20px auto"}
    const btnstyle={margin:'8px 0'}
    const location = useLocation();
    const {User}=location.state


    return(
        
        <Grid >
            
            <Paper elevation={10} style={paperStyle} align="left">
                <Grid align='left'>
                
                <h2>Sign in</h2>
                </Grid>
                <TextField id="outlined-basic" label="Email" placeholder="Enter Email Address" variant="outlined" fullWidth required />
                <br></br>
                <br></br>
                <TextField id="outlined-basic" label="Password" placeholder="Enter password" type="password"variant="outlined" fullWidth required />
                <br></br>
                <br></br>
                <br></br>
                <Button type='submit' style={btnstyle} color='primary' variant="contained" fullWidth>Sign In</Button>
                <Typography><Materiallink href="#">Forgot Password</Materiallink></Typography>
                <Typography>Do you have an account?<Link to="/NewSignUp" state={{ UserRole: {User} }}>Sign Up </Link></Typography>

            </Paper>
        </Grid>
    )
    }
export default Login;