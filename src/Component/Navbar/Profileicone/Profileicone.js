import React from 'react'
import {useHistory} from "react-router-dom";
import "./Profileicone.css";

export default function Profileicone() {
    const history = useHistory()
    const logout =()=>{
        history.push("/logout")
    }
    return (
        <div className="Profileicone">
            <img className="staticLogo" src="https://theboyfromhere.files.wordpress.com/2015/02/girl-rain-art-wallpapear.jpg" alt="data not supported" />
            <div className="profileManageCont">
                <div> 
                <img src="https://theboyfromhere.files.wordpress.com/2015/02/girl-rain-art-wallpapear.jpg" alt="" />
                </div>
            
                <h2 className="name">Name</h2>
                <h4 className="username">User name</h4>
                <h3 className="profilemanage">Profile manage</h3>
                <h3 className="logout"onClick={logout}>Logout</h3>
            </div>
        </div>
    )
}
