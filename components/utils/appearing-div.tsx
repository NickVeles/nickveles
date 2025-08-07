"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type AppearingDivProps = {
  children: React.ReactNode;
  className?: string;
};

export const AppearingDiv = ({ children, className }: AppearingDivProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
