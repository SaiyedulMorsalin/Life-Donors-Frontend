import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Suspense } from "react";

function AboutPage() {
  return (
    <main className="min-h-[85dvh] w-full bg-gradient-to-b from-gray-100 to-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-red-600 sm:text-5xl md:text-6xl">
          LifeDonors
        </h1>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-rose-500">Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                LifeDonors is an automated blood service that connects blood
                searchers with voluntary blood donors instantly through SMS and
                our website. Founded in 2018, we provide this vital service
                completely free of charge to all users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-rose-500">Why LifeDonors?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Despite Bangladesh&apos;s population of over 160 million, safe
                blood banks are scarce, especially outside divisional towns.
                LifeDonors bridges this critical gap in healthcare
                infrastructure.
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vision" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vision">Vision</TabsTrigger>
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="objectives">Objectives</TabsTrigger>
          </TabsList>

          <TabsContent value="vision">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Ensuring no more deaths occur due to lack of blood
                  availability.
                </p>
                <p className="mt-4 text-gray-700">
                  Our vision is to create a world where every patient has access
                  to safe and timely blood transfusions, regardless of their
                  location or circumstances. We aim to eliminate the barriers
                  that prevent people from receiving the blood they need, when
                  they need it.
                </p>
                <p className="mt-4 text-gray-700">
                  We envision a future where the act of donating blood is as
                  simple and common as sending a text message, making blood
                  shortages a thing of the past.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mission">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Leveraging technology to instantly connect blood searchers
                  with voluntary blood donors.
                </p>
                <p className="mt-4 text-gray-700">
                  Our mission is to harness the power of technology to make
                  blood donation efficient, transparent, and accessible. We
                  strive to build a robust network of donors who are always
                  available at the click of a button.
                </p>
                <p className="mt-4 text-gray-700">
                  By streamlining the process and using digital tools, we reduce
                  the complexity and urgency associated with finding blood
                  donors, ensuring that no time is wasted when a life is on the
                  line.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="objectives">
            <Card>
              <CardContent className="pt-6">
                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                  <li>
                    Encourage voluntary blood donation by raising awareness and
                    building a community of regular donors.
                  </li>
                  <li>
                    Create awareness about safe blood transfer practices to
                    ensure the health and safety of both donors and recipients.
                  </li>
                  <li>
                    Enable blood requests via multiple platforms including SMS,
                    website, and social media, making it easy for anyone in need
                    to reach out.
                  </li>
                  <li>
                    Connect voluntary blood donors through SMS, email, and
                    mobile notifications, ensuring rapid response times in
                    emergencies.
                  </li>
                  <li>
                    Develop educational programs to inform the public about the
                    importance of regular blood donation and dispel common myths
                    and misconceptions.
                  </li>
                  <li>
                    Collaborate with healthcare providers and community
                    organizations to expand our reach and effectiveness.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPage />
    </Suspense>
  );
}
