import Link from "next/link";
import { Suspense } from "react";

function NotFoundComponent() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundComponent />
    </Suspense>
  );
}
