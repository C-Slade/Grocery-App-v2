import { React, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../loadingIcon/loading";
import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";
import Error from "../error/error.jsx";
import { useNavigate } from "react-router-dom";
import "./css/login.css";

const Login = ({ scrollIntoView }) => {
  const [isLoggingIn, login] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { signInUser, currentUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    scrollIntoView();
    login(true);
    try {
      await signInUser(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      let data = JSON.stringify(error);
      let errorCode = JSON.parse(data).code;

      setError(true);
      setErrorMessage(errorCode);
      login(false);
    }
  }

  // motion card container animation from left to right
  return (
    <>
      <motion.div
        className="card-container"
        initial={{ opacity: 0, x: -window.innerWidth, position: "relative" }}
        animate={{ opacity: 1, x: 0, position: "relative" }}
        exit={{
          position: "absolute",
          opacity: 0,
          x: window.innerWidth,
        }}
        transition={{
          type: "spring",
          ease: "linear",
          duration: 2,
          x: { duration: 1 },
        }}
      >
        {isLoggingIn ? (
          <Loading />
        ) : (
          <>
            <div className="animated-form">
              <h1>Login</h1>
              <form
                onSubmit={handleSubmit}
                className="login-form"
                onBlur={scrollIntoView}
              >
                <div className="input-container">
                  <input
                    onBlur={scrollIntoView}
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    autoComplete="on"
                  />
                </div>
                <div className="input-container">
                  <input
                    onBlur={scrollIntoView}
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    autoComplete="on"
                  />
                  <Link to="/forgotPass" className="forgot-pass-link">
                    Forgot Password?
                  </Link>
                </div>
                {error ? (
                  <Error errMsg={errorMessage} setErr={setError} />
                ) : null}
                <button className="login">Login</button>
              </form>
              <div className="additonalLinks">
                <p>Not a member?</p>
                <Link to="/register" className="link">
                  Register now!
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Login;
