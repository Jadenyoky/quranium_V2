// React
import { useEffect } from "react";
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
import ThemeToggle from "./components/Theme-Toggle";
// Pages
import Home from "./pages/Home";
import Read from "./pages/Read";
import Contact from "./pages/Contact";
import Posts from "./posts";
import Post from "./post";
import Profile from "./pages/Profile";
import User from "./pages/Profile/user";

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
      path: "/contact",
      component: <Contact />,
    },
    {
      path: "/posts",
      component: <Posts />,
    },
    {
      path: "/posts/:id",
      component: <Post />,
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
      {/* <ThemeToggle /> */}
      <BottomNav />

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
