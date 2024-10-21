import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./nav.module.css";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { movetoY } from "./../../Styles/anim";
import { useUser } from "@clerk/clerk-react";
import ThemeToggleTest from "../Theme-toggle-test";

export default function BottomNav() {
  const { pathname } = useLocation();
  const { user, isLoaded, isSignedIn } = useUser();
  const { scrollY } = useScroll();

  const navi = useNavigate();
  const [value, setValue] = useState(null);

  const buttons = [
    {
      name: "home",
      path: "/",
      icon: <i className="fi fi-rs-home"></i>,
      active: <i className="fi fi-sr-home"></i>,
      title: "الرئيسية",
      navigate: () => {
        navi("/", { state: { title: "الرئيسية" } });
      },
    },
    {
      name: "read",
      path: "/read",
      icon: <i className="fi fi-rs-diary-bookmarks"></i>,
      active: <i className="fi fi-sr-diary-bookmarks"></i>,
      title: "قراءة",
      navigate: () => {
        navi("/read", { state: { title: "قراءة" } });
      },
    },
    {
      name: "profile",
      path: "/profile",
      icon:
        isSignedIn && isLoaded ? (
          <div>
            <img src={user?.imageUrl} />
          </div>
        ) : (
          <i className="fi fi-rs-user"></i>
        ),
      active:
        isSignedIn && isLoaded ? (
          <div>
            <img src={user?.imageUrl} />
          </div>
        ) : (
          <i className="fi fi-sr-user"></i>
        ),
      title: (
        <p className="m-0 overflow-hidden whitespace-nowrap ">
          {isSignedIn && isLoaded ? user.firstName : "الملف الشخصي"}
        </p>
      ),
      navigate: () => {
        navi("/profile", {
          state: {
            title: isSignedIn && isLoaded ? user.firstName : "الملف الشخصي",
          },
        });
      },
    },
    {
      name: "posts",
      path: "/posts",
      icon: <i className="fi fi-rs-grid"></i>,
      active: <i className="fi fi-sr-grid"></i>,
      title: "المزيد",
      navigate: () => {
        navi("/posts", { state: { title: "المزيد" } });
      },
    },
  ];

  const handleNavigation = () => {
    buttons.forEach((e) => {
      if (pathname.includes(e.path.replace("/", ""))) {
        setValue(e.name);
      }
    });
  };

  useEffect(() => {
    handleNavigation();
  }, [pathname]);

  return (
    <>
      <motion.div
        className={` ${Styles.allNav} nothing fixed bottom-0 left-0 right-0`}
        variants={movetoY}
        initial="initial"
        animate="animate"
        exit="exit"
        transition="transition"
      >
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
                }
                `}
                key={k}
                label={e.title}
                value={e.name}
                icon={value === e.name ? e.active : e.icon}
                onClick={e.navigate}
              />
            );
          })}

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
        </BottomNavigation>
      </motion.div>
    </>
  );
}
