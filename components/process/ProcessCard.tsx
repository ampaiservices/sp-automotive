"use client";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  index: number;
  title: string;
  summary: string;
  detail: string;
  open: boolean;
  onToggle: () => void;
};

export default function ProcessCard({ index, title, summary, detail, open, onToggle }: Props) {
  return (
    <motion.div
      layout
      className={`bg-surface border ${open ? "border-accent" : "border-white/10"} hover:border-accent transition-colors`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left p-8 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        <motion.div layout="position" className="flex items-baseline gap-6">
          <span className="font-display text-6xl text-accent leading-none">0{index + 1}</span>
          <div>
            <h3 className="font-display text-3xl text-accent tracking-wide">{title}</h3>
            <p className="mt-2 text-muted">{summary}</p>
          </div>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-8 pb-8 text-text/90 max-w-3xl overflow-hidden"
          >
            {detail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
