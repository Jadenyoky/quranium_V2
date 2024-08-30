// React
import { useEffect } from "react";
import { Route, Routes, NavLink, useLocation } from "react-router-dom";
// Motion
import { motion, AnimatePresence } from "framer-motion";
// Scrollbar
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";
// Page Transition
import Stairs from "./components/Stairs";
// Components
import BottomNav from "./components/Bottom-Nav";
import ThemeToggle from "./components/Theme-Toggle";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Posts from "./posts";
import Post from "./post";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const location = useLocation();

  OverlayScrollbars(document.body, {
    className: "os-theme-dark",
    scrollbars: {
      visibility: "auto",
      autoHide: "leave",
      autoHideDelay: 2000,
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [[], location]);
  return (
    <>
      <NavLink to="/" state={{ title: "Home" }}>
        Home
      </NavLink>
      <NavLink to="/about" state={{ title: "About" }}>
        About
      </NavLink>
      <NavLink to="/contact" state={{ title: "Contact" }}>
        Contact
      </NavLink>
      <NavLink to="/posts" state={{ title: "Posts" }}>
        Posts
      </NavLink>

      {/* <SignedOut>
        <SignIn fallbackRedirectUrl={location.pathname} />
        <SignInButton mode="modal" fallbackRedirectUrl={location.pathname} />
      </SignedOut> */}

      <SignedIn>
        <UserButton />

        <SignOutButton redirectUrl={location.pathname} />
      </SignedIn>

      <ThemeToggle />
      <BottomNav />

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <Stairs>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:id" element={<Post />} />
            </Routes>
          </Stairs>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
