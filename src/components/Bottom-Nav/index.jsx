import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./nav.module.css";
import {
  faSpinner,
  faUser as userSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faUser as userReg } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { scale, scaleProfile } from "./anim";
import { SignedOut, SignedIn, SignInButton, useUser } from "@clerk/clerk-react";

export default function BottomNav() {
  const { pathname } = useLocation();
  const { isLoaded } = useUser();

  const navi = useNavigate();
  const [value, setValue] = useState(null);

  const buttons = [
    {
      name: "home",
      path: "/",
      icon: "fi fi-rs-home",
      active: "fi fi-sr-home",
      title: "Home",
      navigate: () => {
        navi("/", { state: { title: "Home" } });
      },
    },
    {
      name: "about",
      path: "/about",
      icon: "fi fi-rs-diary-bookmarks",
      active: "fi fi-sr-diary-bookmarks",
      title: "About",
      navigate: () => {
        navi("/about", { state: { title: "About" } });
      },
    },
    {
      name: "contact",
      path: "/contact",
      icon: "fi fi-rs-search",
      active: "fi fi-sr-search",
      title: "Contact",
      navigate: () => {
        navi("/contact", { state: { title: "Contact" } });
      },
    },
    {
      name: "posts",
      path: "/posts",
      icon: "fi fi-rs-grid",
      active: "fi fi-sr-grid",
      title: "Posts",
      navigate: () => {
        navi("/posts", { state: { title: "Posts" } });
      },
    },
  ];

  useEffect(() => {
    if (pathname === "/") {
      setValue("home");
    } else if (pathname.includes("about")) {
      setValue("about");
    } else if (pathname.includes("contact")) {
      setValue("contact");
    } else if (pathname.includes("posts")) {
      setValue("posts");
    }
  }, [pathname]);

  return (
    <>
      <motion.div
        className="fixed bottom-0 right-0 left-0 "
        style={{ zIndex: 1001 }}
        variants={scale}
        initial="initial"
        animate="enter"
        exit="exit"
        transition="transition"
      >
        {isLoaded ? (
          <div>
            <SignedOut>
              <motion.div
                variants={scaleProfile}
                whileTap={{ scale: 0.9 }}
                className={Styles.profileLogin}
                onClick={() =>
                  navi("/profile", { state: { title: "Profile" } })
                }
              >
                <FontAwesomeIcon
                  className={Styles.icon}
                  icon={userReg}
                  size="2x"
                />
              </motion.div>
            </SignedOut>
            <SignedIn>
              <motion.div
                variants={scaleProfile}
                whileTap={{ scale: 0.9 }}
                className={Styles.profile}
                onClick={() =>
                  navi("/profile", { state: { title: "Profile" } })
                }
              >
                <FontAwesomeIcon
                  className={Styles.icon}
                  icon={userSolid}
                  size="2x"
                />
              </motion.div>
            </SignedIn>
          </div>
        ) : (
          <motion.div
            variants={scaleProfile}
            whileTap={{ scale: 0.9 }}
            className={Styles.profile}
          >
            <FontAwesomeIcon
              className={Styles.icon}
              icon={faSpinner}
              size="2x"
              beatFade
            />
          </motion.div>
        )}
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className={Styles.nav}
        >
          {buttons.map((e, k) => {
            return (
              <BottomNavigationAction
                className={`${Styles.navLinks} ${
                  value === e.name && Styles.active
                }`}
                key={k}
                label={e.title}
                value={e.name}
                icon={<i className={value === e.name ? e.active : e.icon}></i>}
                onClick={e.navigate}
              />
            );
          })}
        </BottomNavigation>
      </motion.div>
    </>
  );
}
