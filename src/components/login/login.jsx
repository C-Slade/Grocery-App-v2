import { React, useState, useRef } from "react";
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
  const [isAnimatedFormOpen, toggleAnimatedForm] = useState(false);
  const { signInUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit() {
    scrollIntoView();
    login(true);
    try {
      await signInUser(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      let data = JSON.stringify(error);
      let errorCode = JSON.parse(data).code;

      toggleAnimatedForm(false);
      setError(true);
      setErrorMessage(errorCode);
      login(false);
    }
  }

  const variants = {
    open: { opacity: 1, transform: "scale(1)" },
    closed: { opacity: 0, transform: "scale(0)" },
  };

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
        }}
      >
        {isLoggingIn ? (
          <Loading />
        ) : (
          <>
            <motion.div
              className="animated-form"
              animate={!isAnimatedFormOpen ? "open" : "closed"}
              variants={variants}
            >
              <h1>Login</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toggleAnimatedForm(true);
                  setTimeout(() => handleSubmit(), 200);
                }}
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
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Login;
