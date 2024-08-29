import { duration } from "@mui/material";
import { delay } from "framer-motion";

export const expand = {
  initial: {
    top: 0,
  },
  enter: (i) => ({
    top: "100svh",
    transition: {
      duration: 0.5,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: "0", top: "0" },
  }),
  exit: (i) => ({
    height: "100svh",
    transition: {
      duration: 0.5,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};
export const opacity = {
  initial: {
    opacity: 0.5,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0.5,
  },
};

export const titlePage = {
  initial: {
    opacity: 1,
    top: "45%",
  },
  enter: {
    opacity: 0,
    top: "70%",
  },
  exit: {
    opacity: 1,
    top: "45%",
    transition: {
      duration: 1,
      ease: [0.25, 1, 0.5, 1],
      type: "spring",
    },
  },
};
