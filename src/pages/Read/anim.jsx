export const animPage = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      when: "beforeChildren",
      staggerChildren: 1,
    },
  },
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

export const moveY = {
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

export const scaleItem = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
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

export const status = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1.5,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};
