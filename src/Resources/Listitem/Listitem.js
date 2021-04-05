import { makeStyles } from "@material-ui/core";
import React from "react";
import "./Listitem.css";
const useStyles = makeStyles((theme) => ({
  list: {
    width: "90%",
    height: "70px",
    color: "blue",
    display: "flex",
    alignItems: "center",
    paddingLeft: "25px",
    backgroundColor: "#b2bec3",
    border: "1px solid black",
    marginBottom: "10px",
    // justifyContent: "space-between",
  },
  imger: {
    width: "50px",
    height: "50px",
    margin: "0 10px 0 10px",
  },
  nameCont: {
    width: "70%",
    display: "flex",
    alignItems: "center",
  },
}));
export default function Listitem(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.list}
      onClick={() => props.videoClick(props.sendId)}
    >
      <h5>{props.serial}</h5>
      <img src={props.imager} className={classes.imger} alt="" />
      <div className={classes.nameCont}>
        <h4>{props.item}</h4>
      </div>
    </div>
  );
}
