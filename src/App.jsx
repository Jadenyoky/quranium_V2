// React
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// Motion
import { motion, AnimatePresence } from "framer-motion";
// Scrollbar
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";
// Main Css
import "./Styles/index.css";
// Page Transition
import Stairs from "./components/Stairs";
// Components
import BottomNav from "./components/Bottom-Nav";
// Pages
import Home from "./pages/Home";
import Read from "./pages/Read";
import Surah from "./pages/Read/Surah";
import Profile from "./pages/Profile";

import User from "./pages/Profile/user";
import { SignedOut } from "@clerk/clerk-react";
import SignRequire from "./components/Signed-Out";

function App() {
  const location = useLocation();

  const routes = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/read",
      component: <Read />,
    },
    {
      path: "/read/:id",
      component: <Surah />,
    },
    {
      path: "/profile",
      component: <Profile />,
    },
    {
      path: "/profile/user",
      component: <User />,
    },
    {
      path: "*",
      component: (
        <div>
          <h1>404</h1>
          <p>Page Not Found</p>
          <a href="/">Home</a>
        </div>
      ),
    },
  ];

  const scrollBarShow = (visibility) => {
    document.documentElement.style.setProperty(
      "--scroll-visibility",
      visibility
    );
  };

  OverlayScrollbars(document.body, {
    className: "os-theme-dark",
    scrollbars: {
      autoHide: "leave",
      autoHideDelay: 2000,
    },
  });

  useEffect(() => {
    scrollBarShow("hidden");
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 500);
    setTimeout(() => {
      scrollBarShow("auto");
    }, 700);
  }, [[], location.pathname]);
  return (
    <>
      <BottomNav />
      {location.pathname.includes("profile") && (
        <SignedOut>
          <SignRequire />
        </SignedOut>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <Stairs>
            <Routes location={location} key={location.pathname}>
              {routes.map(({ path, component }) => (
                <Route key={path} path={path} element={component} />
              ))}
            </Routes>
          </Stairs>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
