import { motion, useMotionValue, useScroll } from "framer-motion";
import { useEffect } from "react";

let clamp = (number, min, max) => Math.min(Math.max(number, min), max);

function useBoundedScroll(bounds) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newScrollY = scrollYBounded.get() - diff;
      scrollYBounded.set(clamp(newScrollY, 0, bounds));
    });
  }, [bounds, scrollY, scrollYBounded]);
}

export default function Header() {
  let height = useMotionValue(80);
  let opacity = useMotionValue(1);

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious();
      let diff = current - previous;
      let newHeight = height.get() - diff;
      height.set(Math.min(Math.max(newHeight, 50), 80));
      let newOpacity = opacity.get() - diff / 100;
      opacity.set(Math.min(Math.max(newOpacity, 0), 1));
    });
  }, [height, opacity, scrollY]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{ height }}
          className="fixed inset-x-0 flex h-20 bg-white shadow"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <p className="flex origin-left items-center text-xl font-semibold uppercase">
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </p>
            <motion.nav
              className="flex space-x-4 text-xs font-medium text-slate-400"
              style={{
                opacity: opacity,
              }}
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="px-8 pt-28">
          <h1 className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(2).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-slate-200"></div>
            {[...Array(90).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
