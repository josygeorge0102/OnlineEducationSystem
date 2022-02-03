
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Link} from 'react-router-dom';
const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    marginLeft: '8px',
    width: 'auto',
    float: 'left',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
   searchIcon: {
    width: 119,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});
class Header extends React.Component {
  render() {
  const { classes } = this.props;
  return (<AppBar position="static">
     <Toolbar>
          
        <MenuItem>
            <Typography variant="h6" color="inherit" noWrap>
            Home
            </Typography>
        </MenuItem>
        <MenuItem>
            <Typography variant="h6" color="inherit" noWrap>
            About
            </Typography>
        </MenuItem>
        <MenuItem>
            
            
            <Link to="/LoginAsUserType"><Typography variant="h6" color="white" noWrap>Login</Typography></Link>
            
        </MenuItem>
          
          
          <div className={classes.grow}/>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              </div>
        </div>
        </Toolbar>
  </AppBar>
  );
}
}
 
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Header);