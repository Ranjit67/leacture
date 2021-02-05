import React from 'react'
import {useHistory} from "react-router-dom";
import "./Menu.css";
import Divider from '@material-ui/core/Divider';
export default function Menu(props) {
    const history=useHistory()
    const logout=()=>{
        history.push("/logout")
    }
    return (
        <div className={props.menuCont ? "menuShow": "menuHide"}>
            <h2>Dashboard</h2>
            <Divider variant="inset" />
            <h2>Publish & Unpublish course</h2>
            <h2>Manage Profile</h2>
            <h2 onClick={logout}>Logout</h2>
            <h2>About</h2>
        </div>
    )
}


