import * as React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.js";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    width: "100%",
  },
  closed: {
    y: -50,
    opacity: 0,
    transition: {
      y: { stiffness: 2000, velocity: -100 },
    },
    width: "50%",
  },
};

const colors = [
  "#ff1a1a",
  "#ff891a",
  "#a0ff1a",
  "#1af4ff",
  "#311aff",
  "#d11aff",
];

export const MenuItem = ({ i, link, linkName, toggle, signingOut, isOpen }) => {
  const { signOutUser, currentUser } = useAuth();
  const navigate = useNavigate();

  async function toggleMenu() {
    toggle();
    if (signingOut) {
      try {
        await signOutUser();
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }

  // turns all the menu links to point towards the login section if user is not signed in

  const userOnlyLink = () => {
    if (currentUser) {
      return link;
    } else {
      return "/login";
    }
  };
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={isOpen ? { x: 0 } : { x: -window.innerWidth }}
    >
      <motion.div style={style} className={`li-${i} icon-placeholder`} />
      <motion.div
        className={`li-${i} text-placeholder`}
        style={style}
        onClick={() => toggleMenu()}
      >
        <Link
          to={userOnlyLink()}
          style={
            window.innerWidth < 1175 && !currentUser ? { color: "white" } : null
          }
        >
          {linkName}
        </Link>
      </motion.div>
    </motion.li>
  );
};
