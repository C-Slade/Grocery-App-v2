import { React, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./toggleMenu";
import { MenuItems } from "./menuItems";
import { useAuth } from "../../context/authContext";
import "./css/menu.css";

const sidebar = {
  open: (height = 1000) => ({
    width: window.innerWidth > 1175 ? "20vw" : "100vw",
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 100,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      width: 0,
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

export const Menu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const { currentUser } = useAuth();

  // menu background turns white when user is signed in and on a phone
  const navStyles = () => {
    if (currentUser !== null && window.innerWidth < 1175) {
      return {
        background: "white",
      };
    }
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      style={
        isOpen
          ? { width: "100vw", background: "rgba(0, 0, 0, 0.74)", zIndex: 15 }
          : null
      }
    >
      <motion.div
        className="background"
        variants={sidebar}
        style={navStyles()}
      />
      <MenuItems
        toggle={() => {
          toggleOpen();
        }}
        isOpen={isOpen}
      />
      <MenuToggle
        toggle={() => {
          toggleOpen();
        }}
        isOpen={isOpen}
      />
    </motion.nav>
  );
};

export default Menu;
