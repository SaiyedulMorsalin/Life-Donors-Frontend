"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userData";

export default function CTA() {
  const userData = useUserStore((state) => state.userData);
  return userData ? (
    <Link href={"/donate"}>
      <Button variant={"outline"}>Donate Now</Button>
    </Link>
  ) : (
    <Link href={"/register"}>
      <Button variant={"outline"}>Join as Donor</Button>
    </Link>
  );
}
