import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type GlassChipProps = {
  icon: LucideIcon;
  label: string;
  from?: "left" | "right";
  delay?: number;
  className?: string;
};

/**
 * Frosted glass badge used beside the crest. Fixed width and min-height keep
 * both badges the same size, so a two-line label never pushes one out of line.
 */
const GlassChip = ({ icon: Icon, label, from = "left", delay = 0, className }: GlassChipProps) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass-chip flex w-full max-w-[248px] flex-col items-center justify-center gap-3 rounded-[1.75rem] px-5 text-center sm:px-6",
        "h-[168px] sm:h-[196px]",
        className,
      )}
    >
      <span className="grid h-11 w-11 place-items-center rounded-[0.95rem] bg-gradient-to-br from-[hsl(28_100%_62%)] to-[hsl(8_90%_52%)] shadow-[0_10px_20px_-10px_hsl(12_90%_45%/0.9),inset_0_1px_0_hsl(0_0%_100%/0.45)] sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 text-white sm:h-[1.4rem] sm:w-[1.4rem]" strokeWidth={2.4} />
      </span>
      <span className="text-balance text-[1.45rem] font-extrabold leading-[1.1] tracking-[-0.015em] text-gradient-warm sm:text-[1.6rem] lg:text-[1.85rem]">
        {label}
      </span>
    </motion.div>
  );
};

export default GlassChip;
