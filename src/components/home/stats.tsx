"use client";

import { HeartPulse, MapPin, UsersRound } from "lucide-react";
import { AnimatedNumber } from "../ui/animatedNumber";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Stats() {
  const [value_Donor, setValue_Donor] = useState(0);
  const [value_Districts, setValue_Districts] = useState(0);
  const [value_Groups, setValue_Groups] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  if (
    isInView &&
    value_Districts === 0 &&
    value_Donor === 0 &&
    value_Groups === 0
  ) {
    setValue_Donor(462);
    setValue_Districts(64);
    setValue_Groups(8);
  }

  return (
    <section
      ref={ref}
      className="flex min-h-[80dvh] w-full items-center justify-center space-y-10 bg-rose-50"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-16 px-2 xl:px-0">
        <h1 className="text-center text-4xl font-bold">
          We&apos;re a network of
        </h1>
        <div className="grid w-full grid-cols-1 flex-col items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-4 rounded-md border bg-rose-100 py-14">
            <UsersRound size={30} color="red" />
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <AnimatedNumber
                springOptions={{
                  bounce: 0,
                  duration: 2000,
                }}
                value={value_Donor}
              />
              <span>Donors</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-md border bg-rose-100 py-14">
            <MapPin size={30} color="red" />
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <AnimatedNumber
                springOptions={{
                  bounce: 0,
                  duration: 2000,
                }}
                value={value_Districts}
              />
              <span>Districts</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-md border bg-rose-100 py-14">
            <HeartPulse size={30} color="red" />
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <AnimatedNumber
                springOptions={{
                  bounce: 0,
                  duration: 2000,
                }}
                value={value_Groups}
              />
              <span>Groups</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
