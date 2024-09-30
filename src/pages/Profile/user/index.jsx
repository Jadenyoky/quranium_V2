import React, { useEffect, useState } from "react";
import Styles from "./user.module.css";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  UserProfile,
} from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SignRequire from "../../../components/Signed-Out";

const Index = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, []);

  return (
    <>
      {/* <SignRequire /> */}
      <SignedIn>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 1, type: "spring", delay: 0.5 },
          }}
          className="grid place-content-center h-svh w-full"
        >
          <UserProfile
            appearance={{
              elements: {
                cardBox: "w-full h-full bg-primary",
              },
            }}
          />
        </motion.div>
      </SignedIn>
    </>
  );
};

export default Index;
