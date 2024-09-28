import React, { useEffect, useState } from "react";
import Styles from "./contact.module.css";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { anim2, anim3 } from "./anim";
import ThemeToggleTest from "../../components/Theme-toggle-test";

const Index = () => {
  useEffect(() => {}, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          <ThemeToggleTest />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Index;
