"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/userData";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function MobileNavButtons() {
  const [open, setOpen] = useState(false);
  const userData = useUserStore((state) => state.userData);
  const clearUser = useUserStore((state) => state.clearUser);

  async function logOut() {
    await fetch("https://life-donors.onrender.com/users/logout/").finally(
      () => {
        clearUser();
      },
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="px-1">
          <Menu size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[60%]">
        <div className="flex flex-col items-end justify-center gap-8 pt-8">
          <Link href={"/"} className="w-full transition-all hover:scale-105">
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              className="w-full"
            >
              Home
            </Button>
          </Link>
          <Link
            href={"/about"}
            className="w-full transition-all hover:scale-105"
          >
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              className="w-full"
            >
              About
            </Button>
          </Link>
          <Link
            href={"/contact"}
            className="w-full transition-all hover:scale-105"
          >
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              className="w-full"
            >
              Contact
            </Button>
          </Link>
          <Link
            href={"/search-donors"}
            className="w-full transition-all hover:scale-105"
          >
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              className="w-full"
            >
              Search Donors
            </Button>
          </Link>
          {userData ? (
            <>
              <Link
                href={"/donate"}
                className="w-full transition-all hover:scale-105"
              >
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  className="w-full"
                >
                  Donate
                </Button>
              </Link>
              <Link
                href={"/request-donor"}
                className="w-full transition-all hover:scale-105"
              >
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  className="w-full"
                >
                  Request
                </Button>
              </Link>
              <Link
                href={"/dashboard"}
                className="w-full transition-all hover:scale-105"
              >
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  className="w-full"
                >
                  Dashboard
                </Button>
              </Link>
              <Link
                href={"/profile"}
                className="w-full transition-all hover:scale-105"
              >
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  className="w-full"
                >
                  Profile
                </Button>
              </Link>
              <Button
                onClick={() => {
                  void logOut();
                  setOpen(false);
                }}
                variant={"ghost"}
                className="w-full bg-red-300 transition-all hover:scale-105 hover:bg-red-400 hover:text-white"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href={"/register"}
                className="w-full transition-all hover:scale-105"
              >
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  className="w-full"
                >
                  Register
                </Button>
              </Link>
              <Link
                href={"/login"}
                className="w-full transition-all hover:scale-105"
              >
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  className="w-full"
                >
                  Log In
                </Button>
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
