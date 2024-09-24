import React, { useEffect, useState } from "react";
import Styles from "./contact.module.css";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { anim2, anim3 } from "./anim";

const Index = () => {
  const [open, setopen] = useState(true);
  const [open2, setopen2] = useState(false);

  const arr = Array.from({ length: 100 }, (_, i) => i + 1);

  useEffect(() => {}, []);

  return (
    <>
      <button onClick={() => setopen(!open)}>to open</button>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={anim3}
            initial="initial"
            animate="animate"
            exit="exit"
            className={Styles.container}
          >
            <div>Hello</div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setopen2(!open2)}>to open2</button>

      <AnimatePresence mode="wait">
        {open2 &&
          arr.map((e, k) => (
            <motion.div
              className={Styles.container}
              key={k}
              variants={anim3}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={k}
            >
              {e}
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  );
};

export default Index;
