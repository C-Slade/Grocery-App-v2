import { React, useState, useRef } from "react";
import { motion } from "framer-motion";
import Loading from "../loadingIcon/loading";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Success from "../success/success";
import Error from "../error/error";

const Register = ({ scrollIntoView }) => {
  const [isRegistering, setRegister] = useState(false);
  const [isAnimatedFormOpen, toggleAnimatedForm] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, successModal] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signUpUser, signInUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    scrollIntoView();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError(true);
      setErrorMessage("Passwords do not match");
      return;
    } else if (
      passwordRef.current.value === "" ||
      emailRef.current.value === ""
    ) {
      setError(true);
      setErrorMessage("All fields required");
      return;
    }

    try {
      toggleAnimatedForm(true);
      await signUpUser(emailRef.current.value, passwordRef.current.value);
      attemptSignIn();
    } catch (error) {
      let data = JSON.stringify(error);
      let errorCode = JSON.parse(data).code;

      setErrorMessage(errorCode);
      setError(true);
      toggleAnimatedForm(false);
      setRegister(false);
    }
  }

  async function attemptSignIn() {
    try {
      setRegister(true);
      await signInUser(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      let data = JSON.stringify(error);
      let errorCode = JSON.parse(data).code;

      setErrorMessage(errorCode);
      setError(true);
      toggleAnimatedForm(false);
      setRegister(false);
    }
  }

  const variants = {
    open: { opacity: 1, transform: "scale(1)" },
    closed: { opacity: 0, transform: "scale(0)" },
  };

  return (
    <>
      <>
        <motion.div
          className="card-container"
          initial={{ opacity: 0, x: -window.innerWidth }}
          animate={{ opacity: 1, x: 0, position: "relative" }}
          exit={{
            opacity: 0,
            x: window.innerWidth,
            position: "absolute",
            top: 0,
          }}
          transition={{
            type: "spring",
            ease: "linear",
            duration: 2,
            x: { duration: 1 },
          }}
        >
          {isRegistering ? (
            <Loading />
          ) : (
            <>
              <motion.div
                className="animated-form"
                animate={!isAnimatedFormOpen ? "open" : "closed"}
                variants={variants}
              >
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                  <div className="input-container">
                    <input
                      type="email"
                      placeholder="Enter an email"
                      ref={emailRef}
                      onBlur={scrollIntoView}
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="password"
                      placeholder="Create a password"
                      ref={passwordRef}
                      onBlur={scrollIntoView}
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="password"
                      placeholder="Confirm password"
                      ref={confirmPasswordRef}
                      onBlur={scrollIntoView}
                    />
                  </div>
                  {error ? (
                    <Error errMsg={errorMessage} setErr={setError} />
                  ) : null}
                  {success ? (
                    <Success
                      successMsg={"Account created!"}
                      successModal={successModal}
                    />
                  ) : null}
                  <button className="login">Register</button>
                </form>
                <div className="additonalLinks">
                  <p>Already a member?</p>
                  <Link to="/login" className="link">
                    Sign in
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </>
    </>
  );
};

export default Register;
