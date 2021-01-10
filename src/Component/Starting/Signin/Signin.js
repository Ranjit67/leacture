import {Component} from "react";


// import Paper from '@material-ui/core/Paper';
import "./Signin.css";
import Grid from '@material-ui/core/Grid';
import Right from "./Right/Right";
import Loadbox from "../../../Resources/loadbox/Loadbox"


class Signin  extends Component{

    state={
        load:false
    };

    laodHandler=()=>{
        this.setState({load:!this.state.load})
    }


    render(){
      
        return(<div className="Signin">
            

        <Grid container>
        <Grid item xs={3} className="leftsign"></Grid>

        <Grid item xs={4} className="middelSign"></Grid>
        <Grid item xs={5} className="rightSignin">
        <Right 
        loadcon={this.laodHandler}
        />
        </Grid>


            </Grid>

            <div className="photoCont">
                </div>

                <div className="circle">
                <h5 className="boost">BOOST YOUR</h5>

                <h5 className="career">
                     CAREER</h5>

                    </div>


                {this.state.load &&  <Loadbox />}


                   

                   

            </div>

        );
    }
}
export default Signin;