import "./Inputfield.css";

const Inputfield =(props)=>(
    <div className={props.clas+ " forInput"}>
<input 

type={props.type} 
name={props.name} 
placeholder={props.place}
value={props.val}
onChange={(e)=>{props.change(e)}} />
</div>
);

export default Inputfield;