import CTA from "@/components/home/CTA";
import Stats from "@/components/home/stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

function HomePage() {
  return (
    <main>
      <section className="hero_bg_img h-[80dvh] w-full">
        <div className="h-full w-full bg-gradient-to-r from-rose-50 to-transparent">
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center gap-8">
            <div className="w-[95%] space-y-2 text-gray-800 sm:w-[80%]">
              <h1 className="text-balance text-3xl font-bold sm:text-5xl">
                A Community-Driven Automated Platform to Connect, Donate, and
                Save Lives
              </h1>
              <p className="text-balance">
                LifeDonors is a free platform to help blood searchers or
                patients connect voluntary blood donors around Bangladesh. Your
                Donation is a Ray of Hope for Someone in Need.
              </p>
            </div>

            <div className="space-x-4">
              <CTA />

              <Link href={"/request-donor"}>
                <Button variant={"destructive"}>Request Donor</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[80dvh] w-full items-center justify-center space-y-8">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-8 px-2 text-center md:text-left xl:px-0">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4">
            <div className="w-full">
              <h1 className="text-balance text-4xl font-bold">
                What is LifeDonors?
              </h1>
              <p className="text-balance pt-4">
                LifeDonors is an automated blood service that connects blood
                searchers with voluntary donors in a moment through SMS.
                LifeDonors is always a free service for all.
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-4 md:items-end md:justify-end">
              <h1 className="text-balance text-4xl font-bold">
                Why LifeDonors?
              </h1>
              <ul className="md:list-disc md:pr-12">
                <li>100% Automated</li>
                <li>Always free</li>
                <li>24x7 service</li>
                <li>All data is secured</li>
              </ul>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Link href={"/about"}>
              <Button variant={"destructive"} className="mx-auto px-4">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Stats />

      <section className="mx-auto flex min-h-[80dvh] w-full max-w-7xl items-center justify-center space-y-8">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h1 className="text-balance text-4xl font-bold">About Us</h1>
          <p className="mx-auto w-[90%] text-balance text-center md:w-[50%]">
            LifeDonors is an automated blood service that connects blood
            searchers with voluntary blood donors in a moment through SMS.
            LifeDonors is a not-for-profit initiative to aware people of
            voluntary blood donation in Bangladesh.
          </p>
          <Link href={"/about"}>
            <Button variant={"destructive"} className="mx-auto px-4">
              Learn More
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
