import { Facebook, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import CurveSVG from "./curveSVG";

export default function Footer() {
  return (
    <>
      <CurveSVG className="bg-rose-300" fillColor="#f3f4f6" />
      <footer className="flex min-h-[40dvh] flex-col items-center justify-center gap-6 bg-gradient-to-t from-gray-600 to-rose-300 py-4 text-center text-sm text-white/80 md:text-base">
        <h2 className="text-4xl font-bold">LifeDonors</h2>
        <div className="flex w-full flex-wrap items-center justify-center gap-6 text-white/70">
          <Link href={"/about"} className="font-medium hover:underline">
            About
          </Link>
          <Link href={"/profile"} className="font-medium hover:underline">
            Profile
          </Link>
          <Link href={"/contact"} className="font-medium hover:underline">
            Contact
          </Link>
          <Link href={"/donate"} className="font-medium hover:underline">
            Donate
          </Link>
          <Link href={"/request-donor"} className="font-medium hover:underline">
            Request
          </Link>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <Button
            className="size-10 rounded-full p-1 hover:bg-rose-600 hover:text-rose-200"
            variant={"ghost"}
          >
            <Facebook />
          </Button>
          <Button
            className="size-10 rounded-full p-1 hover:bg-rose-600 hover:text-rose-200"
            variant={"ghost"}
          >
            <Twitter />
          </Button>
          <Button
            className="size-10 rounded-full p-1 hover:bg-rose-600 hover:text-rose-200"
            variant={"ghost"}
          >
            <Mail />
          </Button>
          <Button
            className="size-10 rounded-full p-1 hover:bg-rose-600 hover:text-rose-200"
            variant={"ghost"}
          >
            <Linkedin />
          </Button>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-8 text-white/70">
          Copyright © LifeDonors 2024 - Present{" "}
          <span className="hidden md:inline-block">|</span>{" "}
          <br className="sm:hidden" />
          SaiyedulM.
        </div>
      </footer>
    </>
  );
}
