import { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, NavLink, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { motion, AnimatePresence } from "framer-motion";

import Stairs from "./components/Stairs";

import { ThemeContext } from "./components/Theme/ThemeContext";
import { Button, Typography } from "@mui/material";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

import BottomNav from "./components/Bottom-Nav";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";
import Posts from "./posts";
import Post from "./post";

function App() {
  const location = useLocation();
  const { mode, toggleTheme } = useContext(ThemeContext);

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
      <div>
        <Typography variant="h4" gutterBottom>
          {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
        </Typography>
        <Button color="error" variant="contained" onClick={toggleTheme}>
          Toggle to {mode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <Button variant="contained" onClick={toggleTheme}>
          Toggle to {mode === "light" ? "Dark" : "Light"} Mode
        </Button>
      </div>
      <div className="p-8 bg-primary">
        <header className="mb-8 bg-primary">
          <h1 className="text-4xl font-bold mb-4 bg-primary">
            Themed Tailwind CSS Page
          </h1>
          <p className="text-lg bg-primary">
            Explore different themes with Tailwind CSS and CSS Variables.
          </p>
        </header>
      </div>

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

      <SignedOut>
        <SignIn fallbackRedirectUrl={location.pathname} />
        <SignInButton mode="modal" fallbackRedirectUrl={location.pathname} />
      </SignedOut>

      <SignedIn>
        <UserButton />

        <SignOutButton redirectUrl={location.pathname} />
      </SignedIn>

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
