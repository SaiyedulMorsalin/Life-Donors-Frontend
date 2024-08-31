import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import SearchDialog from "./SearchDialog";
import LoginBtn from "./Login-btn";

export default function NavBar() {
  return (
    <header className="sticky left-0 top-0 w-full bg-destructive text-white">
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
                  <Link href={"/"} className="transition-all hover:scale-105">
                    Home
                  </Link>
                  <Link
                    href={"/about"}
                    className="transition-all hover:scale-105"
                  >
                    About
                  </Link>
                  <Link
                    href={"/search-donors"}
                    className="transition-all hover:scale-105"
                  >
                    Search Donors
                  </Link>
                  <Link
                    href={"/register"}
                    className="transition-all hover:scale-105"
                  >
                    Log In
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden items-center justify-end gap-10 lg:flex">
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
            <LoginBtn />
          </div>
        </div>
      </div>
    </header>
  );
}
