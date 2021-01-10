import {Component} from "react";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from "@material-ui/core/styles";



const styles = theme => ({
    root: {
      backgroundColor: "red"
    },
    large: {
        width: "200px",
      height: "200px",
    }
  });
class Avatars extends Component{
    render(){
      
        const { classes } = this.props;
        let avat= this.props.ImageData ?<Avatar alt="" src={this.props.ImageData} className={classes.large} />: null
        return(
          avat
            // <Avatar alt="" src={this.props.ImageData} className={classes.large} />
        )
    }
}

export default withStyles(styles) (Avatars);