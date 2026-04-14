export const pageAnimation = {
  hidden: {
    opacity: 0,
    y: 300,
    ease: "easeOut", // Easing for the hidden state
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut", // Easing for the show state
      when: "beforeChildren",
      staggerChildren: 0.20,
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn", // Easing for the exit state
    },
  },
};

export const cardAnimation = {
  hidden: { opacity: 0, y: 50 }, // Initial state, cards are hidden and slightly down
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Individual card animation duration
      ease: "easeOut",
    },
  },
};

export const leftcircleAnim = ({
  delay = 0,
  startXPos = -400,
  endXPos = -150,
} = {}) => ({
  hidden: {
    opacity: 0,
    transform: `translateX(${startXPos}px)`,
  },

  show: {
    delay,
    opacity: 1,
    transform: `translateX(${endXPos}px)`,
    transition: { duration: 1, ease: "easeOut", delay },
  },
});

export const thumbnailAnim = (delay = 0) => ({
  hidden: {
    // opacity: 0.2,
    padding: "0 40px",
    transform: "perspective(42rem) rotateX(-90deg) scale3d(1,1,1)",
    transformOrigin: "top center",
  },
  show: {
    // opacity: 1,
    transform: "perspective(42rem) rotateX(0deg) scale3d(1,1,1)",
    transition: { duration: 1, ease: "easeOut", delay },
  },
});

export const demoAnim = {
  hidden: {
    // opacity: 0.2,
    padding: "0 40px",
    transform: "perspective(42rem) rotateX(-90deg) scale3d(1,1,1)",
    transformOrigin: "top center",
  },
  visible: {
    // opacity: 1,
    transform: "perspective(42rem) rotateX(0deg) scale3d(1,1,1)",
    transition: { duration: 1, ease: "easeOut" },
  },
};

export const rotateText = (delay = 0.0) => ({
  hidden: {
    opacity: 0.2,
    padding: "0 40px",
    transform: "perspective(42rem) rotateX(90deg) scale3d(1,1,1)",
    transformOrigin: "top center",
  },
  show: {
    opacity: 1,
    transform: "perspective(42rem) rotateX(0deg) scale3d(1,1,1)",
    transition: { duration: 1, ease: "easeOut", delay },
  },
});

export const slideText = {
  hidden: { y: 200 },
  show: {
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

export const slidedownAnim = (delay = 0) => ({
  hidden: { y: -15, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,

    transition: { duration: 0.2, ease: "easeOut", delay },
  },
});
export const sliderightAnim = (delay = 0) => ({
  hidden: { x: -50, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,

    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

export const slideleftAnim = (delay = 0) => ({
  hidden: { x: 100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,

    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});
export const fade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.75 },
  },
};

export const textFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.2 },
  },
};

export const circle = {
  hidden: {
    opacity: 0.2,
    padding: "0 40px",
    transform: "rotateX(-90deg) scale3d(1,1,1)",
    transformOrigin: "top center",
  },
  show: {
    opacity: 1,
    transform: "rotateX(0deg) scale3d(1,1,1)",
    transition: { duration: 1, ease: "easeOut" },
  },
};

export const photoAnim = {
  hidden: { scale: 1.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.75,
    },
  },
};

export const lineAnim = {
  hidden: { width: "0%" },
  show: { width: "100%" },
  transition: { duration: 1 },
};
export const vertAnim = {
  hidden: { height: "0%" },
  show: { height: "100%" },
  transition: { duration: 1 },
};

export const slider = {
  hidden: { x: "-130%", skew: "45deg" },
  show: {
    x: "100%",
    skew: "0deg",
    transition: { ease: "easeOut", duration: 1 },
  },
};

export const sliderContainer = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, ease: "easeOut" } },
};

export const scrollReveal = {
  hidden: { opacity: 0, scale: 1.2, transition: { duration: 0.5 } },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export const navReveal = {
  hidden: {
    top: "-10%",
    transition: { duration: 0.5 },
  },
  show: {
    top: "100%",
    transition: { duration: 0.5 },
  },
};
