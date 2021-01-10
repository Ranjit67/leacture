
import {MoreVert, Delete, Share} from '@material-ui/icons';
import Circulerprogress from "../Circulerprogress/Circulerprogress"
import "./Box.css";


const Box=(props)=>{


    let style
    if(props.im){
         style={
            background: "url("+props.im+")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // backgroundPosition: "center"
        
           }
    } else{
        style={  backgroundColor: "#bdc3c7",
        display: "flex",
    justifyContent: "center",
    alignItems: "center"   
        }
    }

    return(
        <div className="block" style={style}
         onMouseOver={()=>props.over(props.id)} 
         onMouseOut={()=>props.out(props.id)}
         >

{props.im ? 
<div className="titleContent">
                <h4>{props.children} </h4> </div> : <Circulerprogress /> }

                {props.im &&  <div className={"blockFotter "+props.moveClass}>
            {console.log(props.moveClass)}
            <Delete />
            <Share />
            <MoreVert />
        </div>  }

        </div>
    )
    
};
export default Box;