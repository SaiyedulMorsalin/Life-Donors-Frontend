import { Suspense } from "react";

function AboutPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-2 xl:px-0">
        <h2 className="py-16 text-4xl font-semibold md:py-20 md:text-6xl">
          About Us
        </h2>
        <div className="grid grid-cols-1 gap-4 leading-7 lg:grid-cols-2">
          <div className="lg:pb-32">
            <p>
              LifeDonors is an automated blood service that connect blood
              searchers with voluntary blood donors in a moment through SMS and
              website. LifeDonors is a free service for all. LifeDonors started
              its journey in 2018.
            </p>
            <h2 className="py-4 text-2xl font-semibold lg:py-8">
              Why LifeDonors?
            </h2>
            <p>
              Though Bangladesh has more than 160 million people, the number of
              safe blood bank is very few. Without divisional towns, there is
              hardly any blood bank. But a huge amount of blood is needed for
              treatment purposes. A good number of accidents take place every
              day where blood needs essentially. As a result, people fall in
              real trouble to manage blood. But there are many blood donors who
              are interested in donating blood but don’t know who needs blood.
              The communication gap is resulting in the loss of many lives.
              LifeDonors comes into the scenario to reduce or minimize the
              communication gap and connects people in a moment using the
              amazing power of SMS and email. As LifeDonors services can also be
              availed by SMS, people from any class of the society can easily
              avail of LifeDonors services.
            </p>
          </div>
          <div className="pb-8 lg:pb-0">
            <h2 className="pb-4 text-2xl font-semibold lg:pb-8">Vision</h2>
            <p>Ensuring no more death just for the need of blood</p>
            <h2 className="py-4 text-2xl font-semibold lg:py-8">Mission</h2>
            <p>
              Connecting blood searchers with voluntary blood donors in a moment
              with the use of technology.
            </p>
            <h2 className="py-4 text-2xl font-semibold lg:py-8">Objectives</h2>
            <ul className="list-disc pl-4 lg:pl-8">
              <li>Encouraging voluntary blood donation</li>
              <li>Creating awareness about safe blood transfer</li>
              <li>
                Enabling people to place blood request via SMS, website, or
                facebook
              </li>
              <li>Connecting voluntary blood donors via SMS or email</li>
            </ul>
          </div>
        </div>
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
