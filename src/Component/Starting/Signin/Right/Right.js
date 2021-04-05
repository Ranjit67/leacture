import { useState, memo } from "react";
import { useHistory, Link } from "react-router-dom";
import Inputfield from "../../../../Resources/Inputfield/Inputfield";
import Button from "../../../../Resources/Button/Button";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Cookies from "universal-cookie";
import Auth from "../../../../context/auth-context";
import "./Right.css";

const cookies = new Cookies();

const Right = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [boleanstate, setboleanstate] = useState(false);
  const [error, seterror] = useState(false);

  // const contexts = useContext(Auth);

  const clickhandler = async () => {
    if (!username || !password) {
      setboleanstate(true);
    } else {
      props.loadcon();
      const data = JSON.stringify({
        email: username,
        password: password,
      });
      //http://localhost:9000
      //https://leacteer-api.herokuapp.com
      await fetch("https://sqlnbackend.herokuapp.com/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          props.loadcon();

          if (data.error) {
            seterror(true);
          }
          if (data.token) {
            cookies.set("SID", data.refresToken, { maxAge: 24 * 60 * 60 });
            sessionStorage.setItem("NA_R", data.token);
            history.push("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const usernameHandler = (e) => {
    seterror(false);
    setboleanstate(false);
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    seterror(false);
    setboleanstate(false);
  };

  return (
    <div className="RightSignin">
      <h2>SIGNIN</h2>
      {boleanstate && (
        <div className="emptyUserPass">
          <h4>you can not leave empty any singel place.</h4>{" "}
        </div>
      )}
      {error && (
        <div className="emptyUserPass">
          <h4>Check ypur username and password.</h4>{" "}
        </div>
      )}
      <Inputfield
        type="text"
        clas="signinuserNameclass"
        place="ENTER USERNAME"
        change={usernameHandler}
      />
      <Inputfield
        type="password"
        clas="signinPasswordclass"
        place="ENTER PASSWORD"
        change={passwordHandler}
      />

      <Button clas="SigninButton" click={clickhandler}>
        Signin{" "}
      </Button>

      <div className="CreateAccountDiv">
        <BookmarkIcon className="bookMark" fontSize="large" />
        <h3>Create Account </h3>
        <Link to="/signup">
          <Auth.Consumer>
            {(context) => (
              <Button clas="signupButton" click={context.login}>
                Signup{" "}
              </Button>
            )}
          </Auth.Consumer>
        </Link>
      </div>
    </div>
  );
};
export default memo(Right);
