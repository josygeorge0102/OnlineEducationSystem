import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    height:'60vh',
    //paddingTop: theme.spacing.unit * 15,
    //paddingBottom: theme.spacing.unit * 1,
    backgroundColor: '#FFF8DC',
  },
  footer: {
    backgroundColor: '#D3D3D3',
    //marginTop: theme.spacing.unit * 6,
    marginTop:50,
    //padding: `${theme.spacing.unit * 5}px 0`,
    padding:30,
   
    
  }
});
 
function Footer(props) {
  const { classes } = props;
 
  return (
    <footer className={classes.footer}>
      <Paper className={classes.root} elevation={1}>
        <Grid align="left">
        <Typography variant="h6" component="h3">
          ABOUT
        </Typography>
        <Typography component="p">
          Online Education System
        </Typography>
        <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> </p>
       </Grid>
       <Grid align="center">
       <Typography variant="h6" component="h3">
          Contact US
        </Typography>
        <p class="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i>.</p>

       </Grid>
       <Grid align="right">
       <Typography variant="h6" component="h3">
          QUICK LINKS
          <ul class="footer-links">
              <a href="#">Contribute</a><br></br>
              <a href="#">Sitemap</a><br></br>
              <a href="#">Privacy Policy</a></ul>
        </Typography>
       </Grid>
        <Typography component="p">
          @Copyright 2022 All Rights Reserved by Team5
        </Typography>
      </Paper>
    </footer>
  );
}
 
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Footer);