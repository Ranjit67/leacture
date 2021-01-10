import "./Modal.css";

const Modal=(props)=>(
    <div className={"modalContent "+ props.clas}>
        <div className="modalBackground" onClick={props.click}></div>

        <div className={"modal "+props.clasMod}>
            {props.children}
        </div>

        </div>
);
export default Modal;