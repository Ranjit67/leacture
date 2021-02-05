import React from 'react'
import './Videoplay.css'
import video from "../../../assert/video/iOS_WatchOS Developer and Udemy instructor_ Angela Yu shares her story(480P).mp4"
import Videoplayer from "react-video-js-player"

export default function Videoplay(props) {
    const thomenail= "https://miro.medium.com/max/1575/1*grkCuDJjAcepegkoCc3YcA.jpeg"
    const car = video
    return (
        <div className="videoplay">
              
     <Videoplayer 
     src={car}
     poster={thomenail}
     playbackRates={[0.5, 1, 1.5, 2, 2.85, 3]}
     />
 
                    </div>
    )
}
// width="720"
// height="420"
// width="750" height="500"