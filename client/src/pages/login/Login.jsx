import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import Alert from "../../components/alert/Alert";

export default function Login() {
  const [errMsg, setErrMsg] = useState(undefined);
  const email = useRef();
  const password = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setErrMsg(error)
  }, [error])


  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      {error && <Alert msg={errMsg} type="danger" />}
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Kyunsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Kyunsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                <div onClick={() => history.push("/register")}>
                  "Create a New Account"
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
