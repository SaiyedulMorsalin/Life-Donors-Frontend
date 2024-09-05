import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-[85dvh] w-full bg-gray-50 py-8">
      <div className="mx-auto mt-12 grid h-full max-w-7xl grid-cols-1 gap-8 px-4 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 h-full rounded-lg bg-white p-6 shadow-lg md:col-span-1 lg:col-span-2">
          <h2 className="mb-4 text-3xl font-bold text-destructive">
            Get in touch
          </h2>
          <p className="mb-6 text-gray-600">
            We&apos;re here to help and answer any questions you may have.
            Whether you&apos;re looking to donate blood, need assistance finding
            a donor, or want to learn more about our services, we&apos;d love to
            hear from you.
          </p>

          <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2">
            <input
              type="text"
              className="rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive"
              placeholder="First Name"
            />
            <input
              type="text"
              className="rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive"
              placeholder="Last Name"
            />
            <input
              type="email"
              className="rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive"
              placeholder="Email"
            />
            <input
              type="tel"
              className="rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive"
              placeholder="Phone"
            />
            <textarea
              className="col-span-1 rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive md:col-span-2"
              placeholder="Message"
              rows={4}
            ></textarea>
            <Button
              variant={"destructive"}
              className="col-span-1 rounded py-3 text-white transition md:col-span-2"
            >
              Submit
            </Button>
          </div>
        </div>

        <div className="col-span-2 flex w-full flex-col items-start justify-between rounded-lg bg-white p-6 shadow-lg md:col-span-1">
          <div className="">
            <p className="mb-2 text-lg font-medium text-red-600">
              Blood excellence
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Expand blood donate service here
            </h2>
            <p className="mb-6 text-gray-600">
              LifeDonors is dedicated to revolutionizing the way people connect
              for blood donation. Our service is designed to be fast, reliable,
              and accessible to everyone, making it easier than ever to donate
              blood or find a donor in critical times.
            </p>
          </div>
          <div className="space-y-8">
            <div className="mb-4 flex items-center">
              <Phone className="mr-2 text-red-600" />
              <p className="text-gray-700">(+880) 1712345678</p>
            </div>
            <div className="mb-4 flex items-center">
              <MapPin className="mr-2 text-red-600" />
              <p className="text-gray-700">Rangpur Sadar, Rangpur</p>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 text-red-600" />
              <p className="text-gray-700">10AM - 10PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
