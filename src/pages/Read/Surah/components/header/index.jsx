import React from "react";
import {
  movetoY,
  moveY_Element,
  opacity,
  scale,
} from "../../../../../Styles/anim";
import { motion } from "framer-motion";
import Styles from "./header.module.css";

const Index = () => {
  const ss = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 2,
        when: "beforeChildren",
        staggerChildren: 2,
      },
    },
  };
  return (
    <motion.div
      variants={ss}
      initial="initial"
      animate="animate"
      className={Styles.header}
    >
      <motion.h1 variants={scale}>hello</motion.h1>
      <motion.h1 variants={scale}>hello</motion.h1>
      <motion.h1 variants={scale}>hello</motion.h1>
      <motion.h1 variants={scale}>hello</motion.h1>
    </motion.div>
  );
};

export default Index;
