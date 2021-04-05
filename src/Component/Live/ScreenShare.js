import { makeStyles } from "@material-ui/core";
import { useRef, useEffect } from "react";
import io from "socket.io-client";
// import { useAuth } from "../config/AuthContext";
import Peer from "simple-peer";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const useStyles = makeStyles((theme) => ({
  selfVideo: {
    width: "90%",
    height: "calc(.5625*80vw)",
    // marginBottom: 40,
    objectFit: "cover",
    overflow: "hidden",
  },
  selfVideoHidden: {
    height: 0,
    width: 0,
  },
}));
export default function ShareScreen(props) {
  const socketRef = useRef();
  const shareScreenRef = useRef();
  const peerRef = useRef([]);
  //   const { currentUser } = useAuth();
  useEffect(() => {
    socketRef.current = io.connect("https://videotaliap.herokuapp.com/");
    if (cookies.get("SID")) {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          shareScreenRef.current.srcObject = stream;
          socketRef.current.emit("screen share start", {
            mentorUuid: cookies.get("SID"),
          });

          socketRef.current.on("mentor share screen", (payload) => {
            const { studentId } = payload;
            console.log(studentId);
            const peer = createPeer(studentId, socketRef.current.id, stream);
            peerRef.current.push({
              studentId: studentId,
              peer,
            });
          });
          socketRef.current.on("student signal to mentor", (payload) => {
            const { studentSignal, id } = payload;
            const item = peerRef.current.find((pe) => pe.studentId === id);
            item.peer.signal(studentSignal);
          });
        });
    }
  }, [cookies.get("SID")]);
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    // console.log(stream);
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending screen signal", {
        userToSignal,
        callerID,
        signal,
        mentorUuid: cookies.get("SID"),
      });
    });

    return peer;
  }
  const classes = useStyles();
  return (
    <video
      muted
      className={props.cameraOff ? classes.selfVideo : classes.selfVideoHidden}
      ref={shareScreenRef}
      autoPlay
      playsInline
    />
  );
}
