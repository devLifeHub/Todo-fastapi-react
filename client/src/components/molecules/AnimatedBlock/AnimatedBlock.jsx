import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { animationPresets } from "@/animationPresets";


const AnimatedBlock = ({ children, preset, motionProps }) => {
  const presetProps = animationPresets[preset] || {};
  
  return (
      <motion.div {...presetProps} {...motionProps}>
        {children}
      </motion.div>
  );
};

AnimatedBlock.propTypes = {
  children: PropTypes.node.isRequired,
  preset: PropTypes.string,
  motionProps: PropTypes.object,
  presenceProps: PropTypes.object
};

AnimatedBlock.defaultProps = {
  preset: "fade",
  motionProps: {},
};

export default AnimatedBlock;
