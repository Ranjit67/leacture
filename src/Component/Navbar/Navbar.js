import React, { Component } from 'react'
import ListIcon from '@material-ui/icons/List';
import "./Navbar.css";
import Profileicone from "./Profileicone/Profileicone"
import Menu from "./Menu/Menu";
// import {useState} from "react";
import Cookies from 'universal-cookie';
// import Auth from "../../context/auth-context";

const cookies = new Cookies();
 
// const Navbar=(props)=>{
//     const [menuCont, setmenuCont] = useState(false)
//     const [menuHide, setmenuHide] = useState(false)
// const menuHandler = ()=>{
//     setmenuCont((prev)=>{
//         return !prev
//     })
// }
// const menuHAndSHandler=()=>{
    
//     alert("its hit");
// }






//     return ( 
//     <div>
        
//     <div className="Navbar" >
        
//         {menuHide && <ListIcon
//         onClick={menuHandler}
//         fontSize="large"
//         className={menuCont ? "menuIconeActive" : "menuIconeDeactive"}
//         />}
        
//         </div>
//         {menuHide && <Profileicone />}
//          <Menu menuCont={menuCont} />
        
//         </div>
// );}
// export default Navbar;








export default class Navbar extends Component {
    constructor(){
        super()
        this.state={menuCont:false,
        showItemNav:false}
    }
    menuHandler = ()=>{
        this.setState((prev)=>{
           return {menuCont:!prev.menuCont}
        })
    }
    componentDidUpdate(){
        if(cookies.get('SID')){
            console.log("This is the navbar: "+cookies.get('SID'))
        }
        
    }
   
    render() {
        
        return (
            <div>
                <div className="Navbar" >
        
        {cookies.get('SID') && <ListIcon
    onClick={this.menuHandler}
    fontSize="large"
    className={this.state.menuCont ? "menuIconeActive" : "menuIconeDeactive"}
    />}
        
        </div>
         {cookies.get('SID') && <Profileicone />}
         {cookies.get('SID') && <Menu menuCont={this.state.menuCont} />}
            </div>
        )
    }
}
