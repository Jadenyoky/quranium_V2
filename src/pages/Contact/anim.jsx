export const animPage = {
  initial: {
    y: "100px",
    opacity: 0,
  },
  animate: {
    y: "0",
    opacity: 1,
    transition: {
      type: "spring",
      delay: 1,
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
    },
  },
};

export const anim2 = {
  initial: {
    x: "100px",
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: "0",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  exit: {
    x: "100px",
    opacity: 0,
  },
};

export const anim3 = {
  initial: {
    x: "100px",
    opacity: 0,
  },
  animate: (k) => ({
    opacity: 1,
    x: "0",
    transition: {
      delay: 0.01 * k,
    },
  }),
  exit: (k) => ({
    x: "-100px",
    opacity: 0,
    transition: {
      delay: 0.01 * k,
    },
  }),
};
