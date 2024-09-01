import React from "react";
import { motion } from "framer-motion";
import { opacity, expand, titlePage } from "./anim";
import { useLocation } from "react-router-dom";

export default function Layout({ children, backgroundColor }) {
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

  const nbOfColumns = 3;
  return (
    <>
      <motion.div
        {...anim(titlePage)}
        className="fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-3xl font-bold"
        style={{
          zIndex: 10003,
        }}
      >
        . {location.state ? location.state.title : "Hello There !"}
      </motion.div>
      <div className="page stairs" style={{ backgroundColor }}>
        <motion.div {...anim(opacity)} className="transition-background" />
        <div className="transition-container">
          {[...Array(nbOfColumns)].map((_, i) => {
            return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
          })}
        </div>

        {children}
      </div>
    </>
  );
}
