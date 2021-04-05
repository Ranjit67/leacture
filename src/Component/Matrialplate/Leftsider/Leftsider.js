import React from "react";
import "./Leftsider.css";
import Listitem from "../../../Resources/Listitem/Listitem";

export default function Leftsider(props) {
  return (
    <div className="leftsider">
      {props.matrial.map((e, index) => {
        return (
          <Listitem
            key={e._id}
            serial={index + 1}
            imager={e.thumbnail}
            item={e.name}
            sendId={index}
            videoClick={props.videoClick}
          />
        );
      })}
    </div>
  );
}
