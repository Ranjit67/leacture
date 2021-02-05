import React, { Component } from 'react'
// import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// export default function Logout() {
//     const history = useHistory()
//     cookies.remove("SID");
//      history.push("/")
//      return <div></div>
    
// }


export default class Logout extends Component {

     logout = async()=>{
        const datas = cookies.get("SID");
        const data=JSON.stringify({
            refreshToken:datas
        })
        
        await fetch("http://localhost:9000/logout",{
            method: "DELETE",
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: data
           })
        // .then(response=>response.json())
        .then(data=>{
            if(data.status === 200){
                sessionStorage.clear()
            cookies.remove('SID')
                this.props.history.push("/")  
            }else{
                console.log('Somting went wrong.');
            }
            
        })
        .catch(err=>console.log(err))
    }

    constructor(logout){
        super(logout)
        
        // console.log(cookies.get("SID"));
       
        this.logout()
        // this.props.history.push("/")
    }


    //logout function
    // logout = async()=>{
    //     const datas = cookies.get("SID");
    //     const data=JSON.stringify({
    //         refreshToken:datas
    //     })
    //     console.log(data);
     
    //     await fetch("http://localhost:9000/logout",{
    //         method: "DELETE",
    //            headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //           body: data
    //        })
    //     // .then(response=>response.json())
    //     .then(data=>{
    //         console.log(data);
    //     })
    //     .catch(err=>console.log(err))
    // }

    // componentDidMount(){
    //     this.logout()
    // }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

