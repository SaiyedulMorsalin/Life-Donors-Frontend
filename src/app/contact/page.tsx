import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-[85dvh] w-full bg-gray-50 py-8">
      <div className="mx-auto mt-32 grid h-full max-w-7xl grid-cols-3 gap-8 px-4">
        <div className="col-span-2 h-full rounded-lg bg-white p-10 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Get in touch
          </h2>
          <p className="mb-6 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            dolore eum autem eos ducimus pariatur optio? Alias beatae fuga
            nobis.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-8">
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
              type="text"
              className="rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive"
              placeholder="Email"
            />
            <input
              type="text"
              className="rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive"
              placeholder="Phone"
            />
            <input
              type="text"
              className="col-span-2 rounded border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-destructive"
              placeholder="Message"
            />
            <Button
              variant={"destructive"}
              className="col-span-2 rounded py-8 text-white transition"
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-start justify-between rounded-lg bg-white p-8 shadow-lg">
          <div className="">
            <p className="mb-2 text-lg font-medium text-red-600">
              Blood excellence
            </p>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Expand blood donate service here
            </h2>
            <p className="mb-6 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              quas incidunt odio atque recusandae modi architecto libero itaque
              temporibus commodi.
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
