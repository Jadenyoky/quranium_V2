import { duration } from "@mui/material";

export const movetoY = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.7,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  exit: { opacity: 0, y: -20 },
};

export const scaleModal = {
  initial: {
    opacity: 0,
    y: "50px",
    x: "-50%",
  },
  animate: {
    opacity: 1,
    y: "-20px",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: "50px",
    transition: {
      duration: 2,
      type: "spring",
    },
  },
};

export const moveY_Element = {
  initial: {
    opacity: 0,
    y: "50px",
  },
  animate: {
    opacity: 1,
    y: "0",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: "50px",
  },
};

export const actionsAnim = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const animPageOpacity = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};

export const animPageHome = {
  initial: {
    y: "100px",
    opacity: 0,
  },
  animate: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      delay: 2,
      when: "beforeChildren",
      staggerChildren: 2,
    },
  },
};

export const animCategories = {
  initial: {
    x: "-100px",
    opacity: 0,
    visibility: "hidden",
  },
  animate: {
    opacity: 1,
    x: "0",
    visibility: "visible",
    transition: {
      type: "spring",
      duration: 2,
      delay: 0.1,
    },
  },
  exit: {
    x: "-100px",
    opacity: 0,
    visibility: "hidden",
    transition: {
      type: "spring",
      duration: 2,
      delay: 0.1,
    },
  },
};

export const movetoY_10 = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const scale = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};

export const actionsIcon = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
