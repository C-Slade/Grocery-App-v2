import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./menuItem";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.25,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: 5,
      opacity: 0,
    },
  },
};

export const MenuItems = ({ toggle, isOpen }) => {
  // removes the width from the ul when the menu is closed to prevent users not being able to press on inputs properly
  const styles = () => {
    if (isOpen && window.innerWidth < 1175) return { width: "90%" };
    else if (isOpen) return { width: "15.5vw" };
    else return { width: "0" };
  };

  return (
    <motion.ul variants={variants} style={styles()}>
      {links.map((item, i) => (
        <MenuItem
          isOpen={isOpen}
          i={i}
          key={i}
          link={item.Link}
          linkName={item.name}
          toggle={toggle}
          signingOut={item.name === "Sign Out" ? true : false}
        />
      ))}
    </motion.ul>
  );
};

const links = [
  { Link: "/", name: "Home" },
  { Link: "/recipes", name: "Recipes" },
  { Link: "/grocery", name: "Groceries" },
  { Link: "/saved-recipes", name: "Saved Recipes" },
  { Link: "/login", name: "Sign Out" },
];
