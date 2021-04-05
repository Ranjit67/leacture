import React from "react";
import "./Rightsider.css";

export default function Rightsider(props) {
  return (
    <div className="rightsider">
      <button
        disabled={!props.srlNum && !(props.srlNum === 0)}
        onClick={() => props.modalRegulate("top")}
      >
        Add in top
      </button>
      <button
        disabled={!props.srlNum && !(props.srlNum === 0)}
        onClick={() => props.modalRegulate("after")}
      >
        Add in After {props.srlNum && props.srlNum + 1}
      </button>
      <button
        disabled={!props.srlNum && !(props.srlNum === 0)}
        onClick={() => props.modalRegulate("dalete")}
      >
        Delete {props.srlNum && props.srlNum + 1}
      </button>
      <button
        disabled={!props.srlNum && !(props.srlNum === 0)}
        onClick={() => props.modalRegulate("replace")}
      >
        Replace
      </button>
      <button
        onClick={() => props.modalRegulate("before")}
        disabled={!props.srlNum && !(props.srlNum === 0)}
      >
        Add in before {props.srlNum && props.srlNum + 1}
      </button>
      <button
        // disabled={!props.srlNum && !(props.srlNum === 0)}
        onClick={() => props.modalRegulate("end")}
      >
        Add in end
      </button>
    </div>
  );
}
