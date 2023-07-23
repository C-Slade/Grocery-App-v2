import { React } from "react";
import { motion } from "framer-motion";

const Path = (props) => (
  <motion.path
    strokeWidth="3"
    // gives the menu svg the stroke of white to contrast the apps main color when user is not signed in and on a phone
    stroke={
      (window.innerWidth < 1175 && window.location.pathname === "/login") ||
      (window.innerWidth < 1175 && window.location.pathname === "/register") ||
      (window.innerWidth < 1175 && window.location.pathname === "/forgotPass")
        ? "white"
        : "#7347f7"
    }
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }) => {
  return (
    <button onClick={toggle}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
};
