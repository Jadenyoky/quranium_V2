export const allPage = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};
export const profile = {
  initial: { scale: 0.5, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};

export const allContent = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.5,
      delay: 1,
    },
  },
};
export const content1 = {
  initial: { scale: 0.5, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};
export const content2 = {
  initial: { x: "-50px", opacity: 0 },
  animate: {
    x: "0",
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};
export const content3 = {
  initial: { x: "50px", opacity: 0 },
  animate: {
    x: "0",
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};
