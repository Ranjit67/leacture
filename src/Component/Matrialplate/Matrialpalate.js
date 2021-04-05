import React, { Component } from "react";
import "./Matrialplate.css";
import { connect } from "react-redux";
import Rightsider from "./Rightsider/Rightsider";
import Videoplayer from "./Videoelement/Videoplay";
import Leftsider from "./Leftsider/Leftsider";
// import Modal from "../../Resources/Modal/Modal";

import { DoneAll } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import { Modal, Fade, withStyles, Backdrop, Button } from "@material-ui/core";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  classForThumbName: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 0 20px 0",
  },
  uploadBtnDiv: {
    marginTop: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtn: {
    backgroundColor: "#e84393",
    "&:hover": {
      backgroundColor: "#fd79a8",
    },
  },
  NoBtn: {
    backgroundColor: "#ff7675",
    marginLeft: "20px",
  },
});
class Matrialpalate extends Component {
  constructor() {
    super();
    this.state = {
      matrial: [{}],
      modalStyle: getModalStyle,
      modelcontrol: false,
      add: "",
      videoName: "",
      imageMessage: "",
      imageUrl: "",
      videoUrl: "",
      videoMessage: "",
      loading: true,
      acvtiveData: {},
      srlNum: "",
    };
  }
  videoClick = (indexId) => {
    this.setState({ srlNum: indexId });
    this.setState({ acvtiveData: this.state.matrial[indexId] });
    console.log(this.state.matrial[indexId]);
  };
  modelHandel = (data) => {
    this.setState({
      videoName: "",
      imageMessage: "",
      imageUrl: "",
      videoUrl: "",
      videoMessage: "",
    });
    this.setState({ add: data });

    this.setState((prev) => ({ modelcontrol: !prev.modelcontrol }));
  };
  end = async () => {
    alert("hi");
    this.setState({ loading: false });
    await axios
      .post(
        "https://sqlnbackend.herokuapp.com/addVideo ",
        {
          id: this.props.match.params.ip,
          location: this.state.videoUrl,
          name: this.state.videoName,
          thumbnail: this.state.imageUrl,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("NA_R"),
          },
        }
      )

      .then((data) => {
        this.setState({
          loading: true,
          videoName: "",
          imageMessage: "",
          imageUrl: "",
          videoUrl: "",
          videoMessage: "",
        });
        this.modelHandel("close");
        console.log(data);
        this.playlistGet(this.props.match.params.ip);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  delete = async () => {
    alert("delete");
    console.log(this.props.match.params.ip);
    console.log(this.state.acvtiveData._id);
    await axios
      .delete("https://sqlnbackend.herokuapp.com/deleteposition", {
        data: {
          playListId: this.props.match.params.ip,
          videoId: this.state.acvtiveData._id,
        },
        headers: { Authorization: "Bearer " + sessionStorage.getItem("NA_R") },
      })
      // await axios
      //   .delete(
      //     "https://sqlnbackend.herokuapp.com/deleteposition",
      //     {
      //       headers: {
      //         Authorization: "Bearer " + sessionStorage.getItem("NA_R"),
      //       },
      //     },
      //     {
      //       playListId: this.props.match.params.ip,
      //       videoId: this.state.acvtiveData._id,
      //     }
      //   )

      .then((data) => {
        this.setState({
          loading: true,
          videoName: "",
          imageMessage: "",
          imageUrl: "",
          videoUrl: "",
          videoMessage: "",
        });
        this.modelHandel("close");
        console.log(data);
        this.playlistGet(this.props.match.params.ip);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  videoNameHandler = (e) => {
    this.setState({ videoName: e.target.value });
  };

  uploade = async (e) => {
    const files = e.target.files[0];
    const imageBol = files.name.match(/.jpg|.jpeg|.png|.gif/gi);
    if (!imageBol)
      return this.setState({
        imageMessage: "You should to upload image file.",
      });
    this.setState({ imageMessage: "" });

    //    files.includes(".jpg") || files.includes(".jpeg") || files.includes(".JPG") || files.includes(".JPEG") || files.includes(".png") ||
    //    files.includes(".GIF")
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "dazkglov");
    data.append("cloude_name", "dhlqc1hup");
    this.setState({ loading: false });
    await fetch("https://api.cloudinary.com/v1_1/dhlqc1hup/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: true });
        console.log(data.secure_url);
        this.setState({ imageUrl: data.secure_url });
      })
      .catch((err) => console.log(err));
  };

  uploadeVideo = async (e) => {
    const files = e.target.files[0];
    const imageBol = files.name.match(/.mp4|.mov|.avchd|.mkv|.flv/gi);
    // console.log(files.name);
    if (!imageBol)
      return this.setState({ videoMessage: "You should to uplod video file." });
    this.setState({ videoMessage: "" });

    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "profileimages");
    data.append("cloude_name", "dhlqc1hup");
    this.setState({ loading: false });
    await fetch("https://api.cloudinary.com/v1_1/dhlqc1hup/video/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ videoUrl: data.secure_url, loading: true });
        console.log(this.state.videoUrl);
      })
      .catch((err) => console.log(err));
  };
  playlistGet = async (courseId) => {
    await axios
      .post(
        "https://sqlnbackend.herokuapp.com/getplaylist",
        {
          id: courseId,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("NA_R"),
          },
        }
      )
      .then((data) => {
        if (data.data) {
          console.log(data.data.data.video);
          this.setState({ matrial: data.data.data.video });
        }
      })
      .catch((error) => console.log(error));
  };
  componentDidMount() {
    // const { ip } = this.props.match.params;
    this.playlistGet(this.props.match.params.ip);
    console.log(this.props.match.params.ip);
  }
  render() {
    const { classes } = this.props;
    const { ip } = this.props.match.params;
    const SubmitUpload = async () => {
      if (this.state.add === "end") {
        this.end();
      }
      if (this.state.add === "dalete") {
        this.delete();
      }
      // alert("hi");
      // this.setState({ loading: false });
      // await axios
      //   .post(
      //     "http://localhost:9000/addVideo ",
      //     {
      //       id: ip,
      //       location: this.state.videoUrl,
      //       name: this.state.videoName,
      //       thumbnail: this.state.imageUrl,
      //     },
      //     {
      //       headers: {
      //         Authorization: "Bearer " + sessionStorage.getItem("NA_R"),
      //       },
      //     }
      //   )
      //   // .then((response) => {
      //   //   console.log(response);
      //   //   response.json();
      //   // })
      //   .then((data) => {
      //     this.setState({
      //       loading: true,
      //       videoName: "",
      //       imageMessage: "",
      //       imageUrl: "",
      //       videoUrl: "",
      //       videoMessage: "",
      //     });
      //     this.modelHandel("close");
      //     console.log(data);
      //     if (data.error && data.error.status === 405) {
      //       refresh(1);
      //     }
      //   })
      //   .catch((err) => {
      //     if (err && err.status === 405) {
      //       refresh(1);
      //     }
      //   });
    };
    const refresh = async (p) => {
      //https://leacteer-api.herokuapp.com/
      await fetch("https://sqlnbackend.herokuapp.com/refreshtoken", {
        method: "PATCH",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refershToken: cookies.get("SID") }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          if (data.error && data.error.status === 401) {
            sessionStorage.clear();
            cookies.remove("SID");
            this.routingFunction();
          }
          if (data.token) {
            cookies.set("SID", data.refresToken, { maxAge: 24 * 60 * 60 });
            sessionStorage.setItem("NA_R", data.token);

            if (p === 1) {
              SubmitUpload();
            }
          }
        })
        .catch((err) => console.log(err));
    };
    console.log(this.state.acvtiveData);
    return (
      <div>
        <div className="matrialplate">
          <Leftsider
            courseId={ip}
            matrial={this.state.matrial}
            videoClick={this.videoClick}
          />
          <Videoplayer acvtiveData={this.state.acvtiveData} />
          <Rightsider
            srlNum={this.state.srlNum}
            acvtiveData={this.state.acvtiveData}
            modalRegulate={this.modelHandel}
          />
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.modelcontrol}
          onClose={() => {
            this.modelHandel("close");
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modelcontrol}>
            <div className={classes.paper}>
              {this.state.loading ? (
                <>
                  {this.state.add === "dalete" ? (
                    <div>Are you sure ?</div>
                  ) : (
                    <>
                      <p>{this.state.add}</p>
                      <div className={classes.classForThumbName}>
                        Name:
                        <input
                          type="text"
                          placeholder="video name"
                          onChange={this.videoNameHandler}
                          value={this.state.videoName}
                        />
                      </div>
                      <div className={classes.classForThumbName}>
                        Thumbnail:
                        {!this.state.imageUrl ? (
                          <input
                            type="file"
                            placeholder="Thumbnail"
                            onChange={this.uploade}
                          />
                        ) : (
                          <DoneAll />
                        )}
                      </div>

                      <h2 id="transition-modal-title">Video Upload</h2>
                      {!this.state.videoUrl ? (
                        <input type="file" onChange={this.uploadeVideo} />
                      ) : (
                        <DoneAll />
                      )}
                    </>
                  )}
                  <div className={classes.uploadBtnDiv}>
                    <Button
                      className={classes.uploadBtn}
                      onClick={SubmitUpload}
                    >
                      {this.state.add === "dalete" ? "Yes" : "Upload"}
                    </Button>
                    {this.state.add === "dalete" && (
                      <Button
                        className={classes.NoBtn}
                        onClick={() => this.modelHandel("close")}
                      >
                        No
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <CircularProgress />
              )}
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}
// export default withRouter(connect()withStyles(useStyles)(Matrialpalate));
export default withStyles(useStyles)(Matrialpalate);
