"use client";

import { HeartPulse, MapPin, UsersRound } from "lucide-react";
import { AnimatedNumber } from "../ui/animatedNumber";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

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
      className="flex w-full items-center justify-center space-y-10 bg-rose-100 bg-gradient-to-t from-rose-200 to-rose-100 py-20 lg:py-32"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-16 px-2 xl:px-0">
        <div className="">
          <h1 className="pb-4 text-center text-3xl font-bold text-rose-700 md:text-4xl lg:text-5xl">
            We&apos;re a network of dedicated blood heroes
          </h1>
          <p className="text-balance text-center text-gray-700 md:text-lg">
            Our mission is to connect those in need of blood with voluntary
            donors in the fastest and most efficient way possible. We operate
            across multiple districts, uniting donors under various groups to
            make a lifesaving impact.
          </p>
          <div className="flex w-full items-center justify-center pt-8">
            <Link href="/login">
              <Button variant={"destructive"} className="rounded-md px-6 py-2">
                Join Our Network
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="flex items-center justify-center">
                  <UsersRound size={35} className="text-red-500" />
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-rose-500 sm:text-5xl">
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 2000,
                    }}
                    value={value_Donor}
                  />
                  <span className="pl-2">Donors</span>
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="flex items-center justify-center">
                  <MapPin size={35} className="text-red-500" />
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-rose-500 sm:text-5xl">
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 2000,
                    }}
                    value={value_Districts}
                  />
                  <span className="pl-2">Districts</span>
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="flex items-center justify-center">
                  <HeartPulse size={35} className="text-red-500" />
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-rose-500 sm:text-5xl">
                  <AnimatedNumber
                    springOptions={{
                      bounce: 0,
                      duration: 2000,
                    }}
                    value={value_Groups}
                  />
                  <span className="pl-2">Groups</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
