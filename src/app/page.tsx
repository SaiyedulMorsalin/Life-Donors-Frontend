import CTA from "@/components/home/CTA";
import Stats from "@/components/home/stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import SparklesText from "@/components/ui/sparkleText";
import Image from "next/image";
import LoginImage from "@/assets/images/login.png";
import RegisterImage from "@/assets/images/register.png";
import { BadgeCheck } from "lucide-react";
import CurveSVG from "@/components/curveSVG";

function HomePage() {
  return (
    <>
      <section className="h-[60dvh] w-full bg-rose-100 bg-gradient-to-t from-rose-100 to-rose-300/90 md:h-[70dvh]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-2 xl:px-0">
          <div className="flex h-full max-w-[85%] flex-col items-center justify-center gap-6 text-center">
            <div className="space-y-4 text-gray-900">
              <SparklesText
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                text="Platform to Connect, Donate, and Save Lives"
              />

              <p className="md:text-lg lg:text-xl">
                LifeDonors is a free platform to help blood searchers or
                patients connect with voluntary blood donors across Bangladesh.
                Your donation is a ray of hope for someone in need.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <CTA />
              <Link href="/request-donor">
                <Button variant="destructive" className="px-6 py-6">
                  Request Donor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CurveSVG className="bg-white" fillColor="#ffe4e6" />

      <section className="flex min-h-[70dvh] w-full items-center justify-center space-y-8 pb-16 pt-14 md:pt-8 xl:pt-4">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-8 px-2 text-center md:text-left xl:px-0">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-4">
            <div className="flex h-full w-full flex-col items-start justify-center">
              <h2 className="w-full text-balance pb-4 text-center text-3xl font-bold text-rose-600 md:text-left">
                What is LifeDonors?
              </h2>
              <p className="text-balance">
                LifeDonors is an automated blood service that connects blood
                searchers with voluntary donors in a moment through SMS.
                LifeDonors is always a free service for all.
              </p>
              <Link
                href={"/about"}
                className="flex w-full items-center justify-center md:justify-start"
              >
                <Button variant={"outline"} className="mt-10 rounded px-4 py-2">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="flex w-full justify-center">
              <Image
                src={LoginImage}
                alt="LifeDonors"
                className="w-full rounded-lg md:max-w-md"
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-4 md:pt-8">
            <div className="order-2 flex w-full justify-start md:order-1">
              <Image
                src={RegisterImage}
                alt="Why LifeDonors?"
                className="w-full rounded-lg md:max-w-md"
              />
            </div>
            <div className="order-1 flex h-full w-full flex-col items-center justify-center md:order-2 md:items-start">
              <h2 className="w-full text-balance pb-4 text-center text-3xl font-bold text-rose-600 md:text-left">
                Why LifeDonors?
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 md:items-start md:justify-start">
                  <BadgeCheck className="text-green-500" />
                  <p className="font-medium text-gray-800">100% Automated</p>
                </div>
                <div className="flex items-center justify-center gap-2 md:items-start md:justify-start">
                  <BadgeCheck className="text-green-500" />
                  <p className="font-medium text-gray-800">Always free</p>
                </div>
                <div className="flex items-center justify-center gap-2 md:items-start md:justify-start">
                  <BadgeCheck className="text-green-500" />
                  <p className="font-medium text-gray-800">24x7 service</p>
                </div>
                <div className="flex items-center justify-center gap-2 md:items-start md:justify-start">
                  <BadgeCheck className="text-green-500" />
                  <p className="font-medium text-gray-800">
                    All data is secured
                  </p>
                </div>
              </div>
              <Link href={"/about"}>
                <Button variant={"outline"} className="mt-10 rounded px-4 py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CurveSVG className="bg-rose-100" fillColor="#ffff" />

      <Stats />

      <CurveSVG className="bg-white" fillColor="#fecdd3" />

      <section className="flex min-h-[50dvh] w-full items-center justify-center bg-center py-16 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-red-500 md:text-4xl lg:text-5xl">
              Saving Lives Through Blood Donation
            </h2>
            <p className="text-muted-foreground lg:text-lg">
              LifeDonors is a non-profit organization dedicated to connecting
              blood donors with those in need. Our mission is to build a
              community of compassionate individuals who understand the
              life-saving power of blood donation and are committed to making a
              difference in the lives of others.
            </p>
            <Link href="/about">
              <Button variant={"destructive"} className="mt-8 px-6">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
