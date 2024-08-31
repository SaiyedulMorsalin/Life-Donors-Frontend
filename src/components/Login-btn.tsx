"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/userData";
import { useEffect, useState } from "react";

export default function LoginBtn() {
  const userData = useUserStore((state) => state.userData);
  const clearUser = useUserStore((state) => state.clearUser);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  async function logOut() {
    await fetch("https://life-donors.onrender.com/users/logout/").finally(
      () => {
        clearUser();
      },
    );
  }

  return userData && isMounted ? (
    <>
      <Link href={"/dashboard"} className="transition-all hover:scale-105">
        <Button variant={"ghost"}>Dashboard</Button>
      </Link>
      <Link href={"/profile"} className="transition-all hover:scale-105">
        <Button variant={"ghost"}>Profile</Button>
      </Link>
      <Button
        onClick={() => logOut()}
        variant={"ghost"}
        className="transition-all hover:scale-105"
      >
        Log Out
      </Button>
    </>
  ) : (
    <Link href={"/login"} className="transition-all hover:scale-105">
      <Button variant={"ghost"}>Log In</Button>
    </Link>
  );
}
