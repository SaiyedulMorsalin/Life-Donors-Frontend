/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  type SpringOptions,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

type AnimatedNumber = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
}: AnimatedNumber) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
