import { FC } from "react";
import { motion } from "framer-motion";

export const Caret: FC = () => {
  return (
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      className="h-8 w-0.5 m-0 p-0 bg-black dark:bg-white top-0 bottom-0 inline-flex rounded"
      initial={{ opacity: 0 }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
  );
};
