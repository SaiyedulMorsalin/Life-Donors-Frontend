"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar as AvatarIcon } from "@/components/ui/avatar";
import { useUserStore } from "@/store/userData";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { MapPin, User } from "lucide-react";
import { useDashboardQuery } from "@/query/dashboard";
import { useProfileDetailsQuery } from "@/query/profile";

export default function Avatar() {
  const [open, setOpen] = useState(false);
  const userData = useUserStore((state) => state.userData);
  const clearUser = useUserStore((state) => state.clearUser);
  const { data, isLoading } = useDashboardQuery({
    authData: userData ? userData : undefined,
  });
  const { data: profileData } = useProfileDetailsQuery(
    userData ? parseInt(userData.userId!) : undefined,
  );

  async function logOut() {
    await fetch("https://life-donors.onrender.com/users/logout/").finally(
      () => {
        clearUser();
      },
    );
  }

  return userData ? (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <AvatarIcon className="flex items-center justify-center bg-gradient-to-r from-red-300 to-rose-600 shadow-lg ring-1 ring-white">
          <User />
        </AvatarIcon>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex w-full flex-col items-center justify-start gap-3">
          <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-red-300 to-rose-600 text-white shadow-md ring-1 ring-white">
            <User size={40} />
          </div>
          <div className="w-full text-center">
            {profileData?.map((item) => (
              <div key={item.user}>
                <h3 className="text-xl font-bold text-gray-900">
                  {item.user.split(" ")[0]} ({item.blood_group})
                </h3>
                <div className="flex items-center justify-center gap-2 py-2 text-base font-medium text-gray-800">
                  <MapPin size={18} />
                  <p>
                    {item.district.charAt(0).toUpperCase() +
                      item.district.slice(1)}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid w-full grid-cols-2 gap-2 py-4">
              <div className="flex w-full flex-col items-center justify-center rounded-md bg-rose-100/40 py-4 text-center">
                <p className="text-lg font-bold text-rose-800">
                  {isLoading ? "00" : data ? data.my_donate.length : "00"}
                </p>
                <p className="text-sm text-gray-900">Donations</p>
              </div>
              <div className="flex w-full flex-col items-center justify-center rounded-md bg-rose-100/40 py-4 text-center">
                <p className="text-lg font-bold text-rose-800">
                  {isLoading
                    ? "00"
                    : data?.my_requests
                      ? data.my_requests.length
                      : "00"}
                </p>
                <p className="text-sm text-gray-900">Requests</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto space-y-2 border-t pt-4">
          <Link href={"/dashboard"}>
            <Button
              onClick={() => setOpen(!open)}
              variant={"ghost"}
              className="w-full transition-all hover:scale-105"
            >
              Dashboard
            </Button>
          </Link>
          <Link href={"/profile"}>
            <Button
              onClick={() => setOpen(!open)}
              variant={"ghost"}
              className="w-full transition-all hover:scale-105"
            >
              Profile
            </Button>
          </Link>
          <Button
            onClick={() => {
              setOpen(!open);
              void logOut();
            }}
            variant={"ghost"}
            className="w-full bg-red-100 text-red-700 transition-all hover:scale-105 hover:bg-red-300 hover:text-white"
          >
            Log Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <>
      <Link href={"/register"} className="transition-all hover:scale-105">
        <Button variant={"ghost"}>Register</Button>
      </Link>
      <Link href={"/login"} className="transition-all hover:scale-105">
        <Button variant={"ghost"}>Log In</Button>
      </Link>
    </>
  );
}
