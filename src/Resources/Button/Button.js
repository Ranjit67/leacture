
import "./Button.css";

const Buton = (props)=>(

    <div className={"buttonDiv "+ props.clas}>
        <button
        onClick={props.click}
        disabled={props.disab}
        > {props.children} </button> </div>
);

export default Buton;