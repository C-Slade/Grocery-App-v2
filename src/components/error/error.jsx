import React from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import "./css/error.css";

const Error = ({ errMsg, setErr }) => {
  const parseMsg = () => {
    if (errMsg) {
      return errMsg.replace(/-/g, " ").replace(/auth/g, " ").replace("/", " ");
    }
  };
  return (
    <motion.div
      className="error"
      initial={{ opacity: 0, x: -window.innerWidth }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: window.innerWidth }}
      transition={{
        type: "spring",
        ease: "linear",
      }}
    >
      <p>{parseMsg()}</p>
      <IoMdClose onClick={() => (setErr ? setErr(false) : null)} />
    </motion.div>
  );
};

export default Error;
