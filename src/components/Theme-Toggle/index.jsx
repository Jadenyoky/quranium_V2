import * as React from "react";
import { useEffect, useContext } from "react";
import Styles from "./toggle.module.css";
import { motion } from "framer-motion";
import { ThemeContext } from "../../components/Theme/ThemeContext";

export default function BottomNav() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const toggleAnimation = {
    initial: {
      opacity: 0,
      x: "-100%",
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      x: "0",
      scale: 1,
      transition: {
        delay: 2,
        when: "beforeChildren",
        staggerChildren: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      scale: 0.5,
    },
  };

  const toggleIcon = {
    initial: {
      opacity: 0,
      x: "-100%",
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      x: "0",
      scale: 1,
      transition: {
        type: "spring",
      },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      scale: 0.5,
    },
  };

  return (
    <>
      <motion.div
        variants={toggleAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className={Styles.toggle}
        onClick={toggleTheme}
      >
        {mode === "light" ? (
          <motion.i
            variants={toggleIcon}
            className="fi fi-sr-moon-stars"
          ></motion.i>
        ) : (
          <motion.i
            variants={toggleIcon}
            className="fi fi-sr-brightness"
          ></motion.i>
        )}
      </motion.div>
    </>
  );
}
