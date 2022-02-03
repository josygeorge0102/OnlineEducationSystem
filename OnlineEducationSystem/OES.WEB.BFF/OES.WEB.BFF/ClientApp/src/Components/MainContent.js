import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TitlebarBelowImageList from './FrontImages';
const styles = theme => ({
  content: {
  	 ...theme.mixins.gutters(),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
     
  }
});
function MainContent(props) {
    

   
  const { classes } = props;
  return (
    <div className={classes.content}>
        <Typography variant="h5" component="h3">
          Welcome
        </Typography>
        
        <TitlebarBelowImageList/>
    </div>
  );
}
 
MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(MainContent);