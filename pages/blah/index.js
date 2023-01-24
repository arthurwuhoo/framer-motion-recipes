import { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

export default function Page() {
  return (
    <MotionConfig>
      <div className="text-cwhite flex min-h-screen items-start bg-stone-800 pt-16 text-white">
        <p>Test</p>
      </div>
    </MotionConfig>
  );
}
