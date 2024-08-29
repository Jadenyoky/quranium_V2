export const scale = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.7,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};
export const scaleProfile = {
  initial: {
    x: "-50%",
    opacity: 0,
    scale: 0.5,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
};
