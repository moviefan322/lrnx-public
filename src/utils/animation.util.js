const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeInTransition = {
  transition: { duration: 1.2 },
};

const bounceIn = {
  initial: { scale: 0.7, opacity: 0 },
  animate: {
    opacity: 1,
    scale: [ 0.7, 1 ],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

module.exports = {
  fadeIn,
  bounceIn,
  fadeInTransition
};