import React, { Component } from 'react'
import "./Matrialplate.css";
import Rightsider from "./Rightsider/Rightsider"
import Videoplayer from "./Videoelement/Videoplay"
import Leftsider from "./Leftsider/Leftsider"


export default class Matrialpalate extends Component {
    constructor(){
        super()
        this.state={
            matrial:["a","b","c","d","e"]
        }
    }
    render() {
        return (
            <div className="matrialplate">
            <Leftsider matrial={this.state.matrial} />
              <Videoplayer />
              <Rightsider /> 
          </div>
        )
    }
}
