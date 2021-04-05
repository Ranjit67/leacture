import { useEffect, useState } from "react";
import "./Videoplay.css";
import video from "../../../assert/video/iOS_WatchOS Developer and Udemy instructor_ Angela Yu shares her story(480P).mp4";
import Videoplayer from "react-video-js-player";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  noData: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videoplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoplay: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundcolor: "rgb(206, 176, 176)",
  },
  selfVideo: {
    marginTop: "20px",
    width: "90%",
    height: "90%",
    // height: "calc(.5325*80vw)",
  },
}));
export default function Videoplay(props) {
  const classes = useStyles();
  const [video, setVideo] = useState();
  //   const [thomnail, setThomnail] = useState();
  useEffect(() => {
    setVideo(props.acvtiveData.location);
    // setThomnail(props.acvtiveData.thumbnail);
  }, [props.acvtiveData.location]);
  // console.log(props.acvtiveData);
  return (
    <div className={classes.videoplay}>
      {video ? (
        <iframe className={classes.selfVideo} src={video}></iframe>
      ) : (
        <div className={classes.noData}>nodata</div>
      )}
    </div>
  );
}
// width="720"
// height="420"
// width="750" height="500"
