// import { makeStyles } from "@material-ui/core";
// import React from "react";
// import ScreenShare from "./ScreenShare";
// const useStyles = makeStyles((theme) => ({
//   mainDiv: {
//     marginTop: 100,
//   },
// }));
// export default function Golive() {
//   const classes = useStyles();
//   return (
//     <div className={classes.mainDiv}>
//       hi
//       <ScreenShare />
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
  makeStyles,
  Button,
  Grid,
  Divider,
  Avatar,
  IconButton,
  Paper,
} from "@material-ui/core";
// import { COLORS } from "../config";
import { useHistory } from "react-router";
import {
  Videocam,
  VideocamOff,
  MicNone,
  MicOff,
  ScreenShare,
} from "@material-ui/icons";

import ShareScreenComponent from "./ScreenShare";
// import { useAuth } from "../config/AuthContext";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "10px",
  },
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
  afterVideoOff: {
    width: "90%",
    height: "calc(.5625*80vw)",
    overflow: "hidden",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  goLiveBtn: {
    backgroundColor: "#00b894",
  },
  liveInputFieldAndBtn: {
    margin: "20px 0 40px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inputField: {
    textAlign: "center",
    fontSize: "calc(2*8px)",
    marginRight: "20px",
    border: `1px solid #00b894`,
    borderRadius: "20px",
    maxWidth: "300px",
    maxHeight: "46px",
    minHeight: "30px",
    minWidth: "200px",
    "&:focus": {
      outline: "none",
    },
  },
  closeStreamBtn: {
    backgroundColor: "#ff7675",
    transition: "0.5s",
    // marginBottom: 20,
    "&:hover": {
      color: "white",
      backgroundColor: "#ff7675",
    },
  },
  leftSideDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  tabRoot: {
    marginBottom: 20,
    width: "90%",
    fontFamily: "sans-serif",
  },
  avatarAndEndStream: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  AvatarName: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    "& h3": {
      marginLeft: "10px",
    },
  },
  mentorData: {
    width: "90%",
    fontFamily: "sans-serif",
  },
  mentorField: {
    margin: "10px 0 10px 0",
  },
  mentorDescription: {
    width: "90%",
    marginBottom: "20px",
    fontFamily: "sans-serif",
  },
  closeAndMuteBtnDiv: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
  },
  mentorStartDate: {
    color: "gray",
  },
  dividerCs: {
    marginTop: 10,
    backgroundColor: "gray",
  },
  iconBtn1: {
    margin: 5,
    backgroundColor: "#dfe6e9",
  },
  iconBtn2: {
    margin: 5,
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "#ff7675",
    },
  },
}));

const GoLive = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const classes = useStyles();
  const [subjectName, setSubjectName] = useState();
  const [hideInputField, setHideInputField] = useState(true);
  const [cameraOff, setCameraOff] = useState(true);
  const [micOff, setMicOff] = useState(true);
  const [shareScreen, setShareScreen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [startDate, setStartDate] = useState({
    date: "",
    month: "",
    year: "",
    hr: "",
    min: "",
  });
  const history = useHistory();
  const socketRef = useRef();
  const peersRef = useRef([]); //json peer peerId
  const myVideo = useRef();
  //   const { currentUser } = useAuth();
  useEffect(() => {
    //https://videotaliap.herokuapp.com/
    //http://localhost:4000/
    if (cookies.get("SID")) {
      socketRef.current = io.connect("https://videotaliap.herokuapp.com/");
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideo.current.srcObject = stream;
          console.log(cookies.get("SID"));
          //for refresh
          socketRef.current.emit("mentor refresh try", {
            mentorUui: cookies.get("SID"),
          });
          socketRef.current.on("already have", (payload) => {
            const { subjectName, startClass } = payload;

            setHideInputField(false);
            setSubjectName(subjectName);
            setStartDate(startClass);

            socketRef.current.emit("after refresh", {
              roomRef: cookies.get("SID"),
            });
          });
          //forRefresh end
          socketRef.current.on("student want to connect", (payload) => {
            const { studentId, studentUuid } = payload;

            const peer = createPeer(studentId, socketRef.current.id, stream);
            //
            const exit = peersRef.current.find(
              (check) => check.studentUuid === studentUuid
            );
            if (exit) {
              exit.peer.destroy();
              const withdraw = peersRef.current.filter(
                (data) => data.studentUuid !== studentUuid
              );
              peersRef.current = withdraw;
            }
            //
            peersRef.current.push({
              peerId: studentId,
              studentUuid,
              peer,
            });
          });
        });
      socketRef.current.on("student signal to mentor", (payload) => {
        const { studentSignal, id } = payload;

        const item = peersRef.current.find((pe) => pe.peerId === id);
        item.peer.signal(studentSignal);
        socketRef.current.emit("check screen share", {
          mentorUuid: cookies.get("SID"),
          studentId: item.peerId,
        });
      });

      socketRef.current.on("one student leave", (payload) => {
        const item = peersRef.current.find(
          (pee) => pee !== payload.studentLeave
        );
        item.peer.destroy();
      });
    }
  }, []);

  useEffect(() => {
    userDetails();
  }, []);
  const userDetails = async () => {
    try {
      const userData = await axios.post(
        "https://sqlnbackend.herokuapp.com/userdata",
        {},
        {
          headers: {
            Authorization: "Barear " + sessionStorage.getItem("NA_R"),
          },
        }
      );
      //   userData.data.data
      console.log(userData);
      setCurrentUser(userData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(currentUser.photoURL);
  const goLiveSubmit = () => {
    // console.log(cookies.get("SID"));
    const dat = new Date();
    setStartDate({
      date: dat.getDate(),
      month: month[dat.getMonth()],
      year: dat.getFullYear(),
      hr: dat.getHours(),
      min: dat.getMinutes(),
    });
    const tempDate = {
      date: dat.getDate(),
      month: month[dat.getMonth()],
      year: dat.getFullYear(),
      hr: dat.getHours(),
      min: dat.getMinutes(),
    };
    setHideInputField(false);

    socketRef.current.emit("mentor start class", {
      subjectName,
      mentorId: cookies.get("SID"),
      dat: tempDate,
    });
  };

  function createPeer(userToSignal, callerID, stream, data) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    // console.log(stream);
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        data,
      });
    });

    return peer;
  }
  const closeStream = () => {
    setSubjectName();
    setHideInputField(true);
    peersRef.current.forEach((stud) => {
      stud.peer.destroy();
    });
    peersRef.current = [];
    socketRef.current.emit("end meeting", { mentorUUid: cookies.get("SID") });
    history.push("/");
  };
  const cameraHandel = () => {
    setCameraOff((prev) => !prev);
    return socketRef.current.emit("video mute status", {
      cameraStatus: !cameraOff,
      mentorUuid: cookies.get("SID"),
    });
  };
  const micHandle = () => {
    setMicOff((prev) => !prev);
    socketRef.current.emit("mentor mute status", {
      mute: !micOff,
      mentorUuid: cookies.get("SID"),
    });
  };
  // console.log(mentor);

  const screenSharerHandler = () => {
    setShareScreen((prev) => !prev);
  };

  return (
    <Grid container>
      <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
        <div className={classes.root}>
          {hideInputField && (
            <div className={classes.liveInputFieldAndBtn}>
              <input
                type="text"
                placeholder="Enter your course name"
                onChange={(e) => setSubjectName(e.target.value)}
                className={classes.inputField}
              />
              <Button className={classes.goLiveBtn} onClick={goLiveSubmit}>
                Go Live
              </Button>
            </div>
          )}

          <video
            muted
            className={
              cameraOff
                ? !shareScreen
                  ? classes.selfVideo
                  : classes.selfVideoHidden
                : classes.selfVideoHidden
            }
            ref={myVideo}
            autoPlay
            playsInline
          />
          {shareScreen && <ShareScreenComponent cameraOff={cameraOff} />}
          {!cameraOff && (
            <Paper elevation={3} className={classes.afterVideoOff}>
              <Avatar
                style={{
                  width: 200,
                  height: 200,
                }}
                src={currentUser.profilePic}
                alt=" "
              />
            </Paper>
          )}

          {!hideInputField && (
            <Paper elevation={3} className={classes.closeAndMuteBtnDiv}>
              <IconButton
                classes={
                  cameraOff
                    ? { root: classes.iconBtn1 }
                    : { root: classes.iconBtn2 }
                }
                onClick={cameraHandel}
              >
                {cameraOff ? (
                  <Videocam />
                ) : (
                  <VideocamOff style={{ color: "white" }} />
                )}
              </IconButton>
              <IconButton
                classes={
                  micOff
                    ? { root: classes.iconBtn1 }
                    : { root: classes.iconBtn2 }
                }
                onClick={micHandle}
              >
                {micOff ? <MicNone /> : <MicOff style={{ color: "white" }} />}
              </IconButton>
              <IconButton
                classes={
                  !shareScreen
                    ? { root: classes.iconBtn1 }
                    : { root: classes.iconBtn2 }
                }
                onClick={() => {
                  screenSharerHandler();
                }}
              >
                {!shareScreen ? (
                  <ScreenShare />
                ) : (
                  <ScreenShare style={{ color: "white" }} />
                )}
              </IconButton>
            </Paper>
          )}
          {!hideInputField && (
            <div className={classes.tabRoot}>
              <h4 className={classes.mentorField}>{subjectName}</h4>
              <h5 className={classes.mentorStartDate}>
                {` ${startDate.date} ${startDate.month} ${startDate.year} ${startDate.hr}. ${startDate.min} `}
              </h5>
              <Divider classes={{ root: classes.dividerCs }} />
              <div className={classes.avatarAndEndStream}>
                <div className={classes.AvatarName}>
                  <Avatar
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    src={currentUser.profilePic}
                    alt=" "
                  />
                  <h3>{currentUser.name}</h3>
                </div>
                <Button
                  className={classes.closeStreamBtn}
                  onClick={closeStream}
                >
                  End Stream
                </Button>
              </div>
            </div>
          )}
        </div>
      </Grid>
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <div className={classes.leftSideDiv}>name print div</div>
      </Grid>
    </Grid>
  );
};

export default GoLive;
