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

export const anim3 = {
  initial: {
    x: "100px",
    opacity: 0,
  },
  animate: {
    opacity: 1,
    x: "0",
    transition: {
      type: "spring",
    },
  },
};
