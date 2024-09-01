import React, { useEffect, useState } from "react";
import Styles from "./profile.module.css";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  allPage,
  profile,
  allContent,
  content1,
  content2,
  content3,
} from "./anim";

const Index = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, []);

  return (
    <div>
      <SignedOut>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 1 } }}
          className="h-svh grid place-content-center"
        >
          <SignIn fallbackRedirectUrl={pathname} />
        </motion.div>
      </SignedOut>

      <SignedIn>
        <motion.div
          variants={allPage}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className={`${Styles.profilePage} `}>
            <motion.div
              className={`
                ${Styles.title}
                text-xl h-16 font-bold text-center flex gap-4 justify-start items-center sticky top-0 pl-5 sm:pl-0 sm:justify-center
              `}
              style={{
                zIndex: 10000,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                borderRadius: "0 0 24px 24px",
              }}
            >
              <FontAwesomeIcon icon={faPerson} />
              <div>Profile</div>
              <motion.div
                variants={profile}
                className={` ${Styles.userName} font-bold text-sm  p-2 rounded-full flex justify-center items-center w-fit`}
              >
                <UserButton showName userProfileMode="modal" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={allContent}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`${Styles.content}`}
            >
              <motion.div variants={content1} className={Styles.box}>
                <div className={Styles.one}>
                  <p>SAVED</p>
                  <FontAwesomeIcon icon={faPerson} />
                </div>
              </motion.div>
              <motion.div variants={content2} className={Styles.box}>
                <div className={Styles.two}>
                  <p>SAVED</p>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className={Styles.three}>
                  <p>SAVED</p>
                  <FontAwesomeIcon icon={faPerson} />
                </div>
              </motion.div>
              <motion.div variants={content3} className={Styles.box}>
                <div className={Styles.four}>
                  <p>SAVED</p>
                  <FontAwesomeIcon icon={faPerson} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </SignedIn>
    </div>
  );
};

export default Index;
