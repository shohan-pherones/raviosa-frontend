const customEase = [0.45, 0, 0.55, 1];

export const fadeDown = (delay = 0, duration = 0.5) => ({
  hidden: {
    opacity: 0,
    y: "-100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: customEase,
    },
  },
});

export const fadeUp = (delay = 0, duration = 0.5) => ({
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: customEase,
    },
  },
});

export const scaleDown = (delay = 0, duration = 0.5) => ({
  hidden: {
    opacity: 0,
    scale: 1.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: customEase,
    },
  },
});

export const scaleUp = (delay = 0, duration = 0.5) => ({
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: customEase,
    },
  },
});
