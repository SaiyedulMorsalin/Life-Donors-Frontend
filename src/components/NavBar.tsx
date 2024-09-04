import Link from "next/link";
import dynamic from "next/dynamic";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
const SearchDialog = dynamic(() => import("./SearchDialog"), { ssr: false });
import Avatar from "./Avatar";
import MobileNavButtons from "./mobileNavButtons";

export default function NavBar() {
  return (
    <header className="sticky left-0 top-0 z-50 w-full bg-destructive text-white">
      <div className="mx-auto w-full max-w-[80rem] px-2 xl:px-0">
        <div className="flex items-center justify-between py-6">
          <Link href={"/"} className="flex-1 text-xl font-black">
            LifeDonors
          </Link>
          <div className="inline-flex items-center justify-between gap-4 lg:hidden">
            <SearchDialog />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"ghost"}>
                  <Menu size={30} />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[60%]">
                <div className="flex flex-col items-end justify-center gap-8 pt-8">
                  <Link
                    href={"/"}
                    className="w-full transition-all hover:scale-105"
                  >
                    <Button variant={"ghost"} className="w-full">
                      Home
                    </Button>
                  </Link>
                  <Link
                    href={"/about"}
                    className="w-full transition-all hover:scale-105"
                  >
                    <Button variant={"ghost"} className="w-full">
                      About
                    </Button>
                  </Link>
                  <Link
                    href={"/search-donors"}
                    className="w-full transition-all hover:scale-105"
                  >
                    <Button variant={"ghost"} className="w-full">
                      Search Donors
                    </Button>
                  </Link>
                  <Link
                    href={"/donate"}
                    className="w-full transition-all hover:scale-105"
                  >
                    <Button variant={"ghost"} className="w-full">
                      Donate
                    </Button>
                  </Link>
                  <MobileNavButtons />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden items-center justify-end gap-4 lg:flex">
            <SearchDialog />
            <Link href={"/"} className="transition-all hover:scale-105">
              <Button variant={"ghost"}>Home</Button>
            </Link>
            <Link href={"/about"} className="transition-all hover:scale-105">
              <Button variant={"ghost"}>About</Button>
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
            <Avatar />
          </div>
        </div>
      </div>
    </header>
  );
}
