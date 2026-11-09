import { motion, useReducedMotion } from "framer-motion";

/**
 * One-time 3D entrance: the hero swings in on a 3D arc for ~3s,
 * then settles perfectly square and stays still.
 */
const HeroStage = ({ children }: { children: React.ReactNode }) => {
  const reduced = useReducedMotion();

  return (
    <div className="perspective-hero w-full">
      <motion.div
        initial={reduced ? false : { rotateX: 18, rotateY: -22, scale: 0.92, opacity: 0 }}
        animate={{ rotateX: [18, -6, 3, 0], rotateY: [-22, 10, -4, 0], scale: [0.92, 1.02, 1], opacity: 1 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="preserve-3d w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HeroStage;
