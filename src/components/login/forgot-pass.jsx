import { React, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./css/login.css";
import Loading from "../loadingIcon/loading";
import Error from "../error/error.jsx";
import Success from "../success/success";
import { useAuth } from "../../context/authContext";

const ForgotPass = ({ scrollIntoView }) => {
  const [submittingRecov, submitRecov] = useState(false);
  const [isAnimatedFormOpen, toggleAnimatedForm] = useState(false);
  const [success, successModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { sendPassReset } = useAuth();
  const emailRef = useRef();

  async function handleSubmit() {
    // remove any notifications before resubmitting
    scrollIntoView();
    successModal(false);
    setError(false);
    try {
      submitRecov(true);
      toggleAnimatedForm(true);
      await sendPassReset(emailRef.current.value);
      toggleAnimatedForm(false);
      submitRecov(false);
      successModal(true);
    } catch (error) {
      let data = JSON.stringify(error);
      let errorCode = JSON.parse(data).code;
      toggleAnimatedForm(false);
      submitRecov(false);
      setError(true);
      setErrorMessage(errorCode);
    }
  }

  const variants = {
    open: { opacity: 1, transform: "scale(1)" },
    closed: { opacity: 0, transform: "scale(0)" },
  };

  return (
    <>
      <motion.div
        className="card-container forgotPass"
        initial={{ opacity: 0, x: -window.innerWidth }}
        animate={{ opacity: 1, x: 0, position: "relative" }}
        exit={{ opacity: 0, x: window.innerWidth, position: "absolute" }}
        transition={{
          type: "spring",
          ease: "linear",
        }}
      >
        <>
          {submittingRecov ? (
            <Loading />
          ) : (
            <>
              <motion.div
                className="animated-form"
                animate={!isAnimatedFormOpen ? "open" : "closed"}
                variants={variants}
              >
                <h1>Forgot Password</h1>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toggleAnimatedForm(true);
                    setTimeout(() => handleSubmit(), 200);
                  }}
                  className="forgotPass-form"
                >
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="Enter your email"
                      ref={emailRef}
                      onBlur={scrollIntoView}
                    />
                  </div>
                  {error ? (
                    <Error errMsg={errorMessage} setErr={setError} />
                  ) : null}
                  {success ? (
                    <Success
                      successMsg={"Reset link sent to your email"}
                      successModal={successModal}
                      signIn="false"
                    />
                  ) : null}
                  <button className="login submit">Submit</button>
                </form>
                <div className="additonalLinks">
                  <Link to="/login" className="link">
                    Sign in
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </>
      </motion.div>
    </>
  );
};

export default ForgotPass;
