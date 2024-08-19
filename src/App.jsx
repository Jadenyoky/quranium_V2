import { useContext, useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
  useUser,
} from "@clerk/clerk-react";

import PostDetail from "./PostDetail";

function App() {
  const user = useUser();
  const location = useLocation();
  console.log(user);

  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/post/1">post/1</NavLink>
      <NavLink to="/post/10">post/10</NavLink>
      <NavLink to="/post/30">post/30</NavLink>
      <NavLink to="/post/47">post/47</NavLink>

      <SignedOut>
        <SignIn fallbackRedirectUrl={location.pathname} />
        <SignInButton mode="modal" fallbackRedirectUrl={location.pathname} />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <div>
          <Typography variant="h4" gutterBottom>
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </Typography>
          <Button variant="contained" onClick={toggleTheme}>
            Toggle to {mode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </div>
        <SignOutButton redirectUrl={location.pathname} />
      </SignedIn>

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <Stairs>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </Stairs>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
