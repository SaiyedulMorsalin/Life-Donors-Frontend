"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userData";

export default function CTA() {
  const userData = useUserStore((state) => state.userData);
  return userData ? (
    <Link href={"/donate"}>
      <Button variant={"outline"} className="px-6 py-6">
        Donate Now
      </Button>
    </Link>
  ) : (
    <Link href={"/register"}>
      <Button variant={"outline"} className="px-6 py-6">
        Join as Donor
      </Button>
    </Link>
  );
}
