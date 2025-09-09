export const animationPresets = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: "linear" }
  },
  slideUp: {
    initial: { opacity: .2, y: 800 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: .2, y: 800 },
    transition: { duration: 0.4, ease: "linear" }
  },
  slideDown: {
    initial: { opacity: .2, y: -800 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: .2, y: -800 },
    transition: { duration: 0.4, ease: "linear" }
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -90, scale: 0.8 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.8 },
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  alertDown: {
    initial: { y: -60, opacity: 0 },
    animate: { y: 10, opacity: 10  },
    exit: { y: -60,  opacity: 0  },
    transition: { duration: 0.4, ease: "easeInOut" }
  },
};
