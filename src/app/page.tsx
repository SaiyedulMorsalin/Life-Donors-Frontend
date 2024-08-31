import { Button } from "@/components/ui/button";
import { HeartPulse, MapPin, UsersRound } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="h-[35rem] w-full bg-rose-50">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-8">
          <div className="w-[95%] space-y-2 text-center sm:w-[80%]">
            <h1 className="text-balance text-3xl font-bold sm:text-5xl">
              A Community-Driven Automated Platform to Connect, Donate, and Save
              Lives
            </h1>
            <p className="text-balance">
              LifeDonors is a free platform to help blood searchers or patients
              connect voluntary blood donors around Bangladesh. Your Donation is
              a Ray of Hope for Someone in Need.
            </p>
          </div>

          <div className="space-x-4">
            <Link href={"/login"}>
              <Button variant={"outline"}>Join as Donor</Button>
            </Link>

            <Link href={"/request-donor"}>
              <Button variant={"destructive"}>Request Donor</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full space-y-8 py-20 md:h-[30rem] md:py-0">
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

      <section className="w-full space-y-10 bg-rose-50 py-20 md:py-32">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-16 px-2 xl:px-0">
          <h1 className="text-center text-4xl font-bold">
            We&apos;re a network of
          </h1>
          <div className="grid w-full grid-cols-1 flex-col items-center justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border bg-rose-100 py-14">
              <UsersRound size={30} color="red" />
              <p className="text-2xl font-bold">462 Donors</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border bg-rose-100 py-14">
              <MapPin size={30} color="red" />
              <p className="text-2xl font-bold">64 Districts</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border bg-rose-100 py-14">
              <HeartPulse size={30} color="red" />
              <p className="text-2xl font-bold">8 Blood Groups</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto h-[30rem] w-full max-w-7xl space-y-8">
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
