import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
const SearchDialog = dynamic(() => import("./SearchDialog"), { ssr: false });
import Avatar from "./Avatar";
import MobileNavButtons from "./mobileNavButtons";

export default function NavBar() {
  return (
    <header className="sticky left-0 top-0 z-50 w-full bg-destructive text-white">
      <div className="mx-auto w-full max-w-[80rem] px-2 xl:px-0">
        <div className="flex items-center justify-between py-6">
          <Link href={"/"} className="flex-1 text-2xl font-black">
            LifeDonors
          </Link>
          <div className="inline-flex items-center justify-between gap-3 lg:hidden">
            <SearchDialog />
            <Avatar />
            <MobileNavButtons />
          </div>
          <div className="hidden items-center justify-end gap-4 lg:flex">
            <SearchDialog />
            <Link href={"/"} className="transition-all hover:scale-105">
              <Button variant={"ghost"}>Home</Button>
            </Link>
            <Link
              href={"/search-donors"}
              className="transition-all hover:scale-105"
            >
              <Button variant={"ghost"}>Search Donors</Button>
            </Link>
            <Link href={"/donate"} className="transition-all hover:scale-105">
              <Button variant={"ghost"}>Donate</Button>
            </Link>
            <Link
              href={"/request-donor"}
              className="transition-all hover:scale-105"
            >
              <Button variant={"ghost"}>Request</Button>
            </Link>
            <Link href={"/about"} className="transition-all hover:scale-105">
              <Button variant={"ghost"}>About</Button>
            </Link>
            <Link href={"/contact"} className="transition-all hover:scale-105">
              <Button variant={"ghost"}>Contact</Button>
            </Link>

            <Avatar />
          </div>
        </div>
      </div>
    </header>
  );
}
