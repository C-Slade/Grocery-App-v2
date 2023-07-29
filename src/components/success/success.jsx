import React from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./css/success.css";

const Success = ({ successMsg, successModal, signIn }) => {
  const parseMsg = successMsg
    .replace(/-/g, " ")
    .replace(/auth/g, " ")
    .replace("/", " ");
  return (
    <motion.div
      className="successModal"
      initial={{ opacity: 0, x: -window.innerWidth }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: window.innerWidth }}
      transition={{
        type: "spring",
        ease: "linear",
      }}
    >
      <p>{parseMsg}</p>
      {signIn && signIn === "false" ? null : <Link to="/login">Sign in</Link>}
      <IoMdClose onClick={() => successModal(false)} />
    </motion.div>
  );
};

export default Success;
