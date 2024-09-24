import React from "react";
import { motion } from "framer-motion";
import { opacity, expand, titlePage } from "./anim";
import { useLocation } from "react-router-dom";
import Styles from "./stairs.module.css";

export default function Layout({ children }) {
  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const location = useLocation();

  const nbOfColumns = 5;
  return (
    <>
      <motion.div
        {...anim(titlePage)}
        className={`${Styles.title} fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-3xl font-bold`}
        style={{
          zIndex: 10003,
        }}
      >
        {location.state ? location.state.title : "مرحبًا بعودتك .."} ..
      </motion.div>
      <div className={Styles.stairs}>
        <motion.div
          {...anim(opacity)}
          className={Styles.transition_background}
        />
        <div className={Styles.transition_container}>
          {[...Array(nbOfColumns)].map((_, i) => {
            return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
          })}
        </div>

        {children}
      </div>
    </>
  );
}
