import React, { useEffect } from "react";
import Styles from "./signed-out.module.css";
import { SignedOut, SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, []);

  return (
    <>
      <SignedOut>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 1 } }}
          className="h-svh grid place-content-center"
        >
          <SignIn fallbackRedirectUrl={pathname} />
        </motion.div>
      </SignedOut>
    </>
  );
};

export default Index;
