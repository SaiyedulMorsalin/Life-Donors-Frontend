"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/userData";
import { Loader2 } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { districts } from "@/assets/constants";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const RequestSchema = z.object({
  blood_group: z.string(),
  blood_request_type: z.string(),
  date_of_donation: z.string().nullable(),
  details: z.string(),
  district: z.string(),
  donor: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
});

const userProfileSchema = z.object({
  user: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
});

const UserProfileSchemaArray = z.array(userProfileSchema);
type UserProfile = z.infer<typeof userProfileSchema>;
type UserRequestsType = z.infer<typeof RequestSchema>;

const ApiResponseSchema = z.object({
  donor_id: z.number(),
  my_requests: z.array(RequestSchema).nullable(),
});

const formSchema = z.object({
  blood_group: z
    .string()
    .min(1, { message: "Please enter a valid blood group." }),
  blood_request_type: z.enum(["Running", "Pending", "Completed"], {
    message: "Please select a status.",
  }),
  district: z.string().min(1, { message: "District is required." }),
  gender: z.string({
    message: "Please select 'Male' or 'Female' for gender.",
  }),
  details: z.string().min(1, { message: "Details cannot be empty." }),
});

function getCurrentDateFormatted(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function DashboardPage() {
  const [requestDate, setRequestDate] = useState<Date | undefined>(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [profile, setProfile] = useState<UserProfile[] | null>(null);
  const [userRequests, setUserRequests] = useState<UserRequestsType[] | null>(
    null,
  );
  const authData = useUserStore((store) => store.userData);
  const [isRequestsLoading, setIsRequestsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blood_group: "",
      blood_request_type: "Pending",
      details: "",
      district: "",
      gender: "",
    },
  });

  async function getData() {
    if (!authData) return;
    setIsRequestsLoading(true);
    setIsProfileLoading(true);
    const response_Dashboard = await fetch(
      `https://life-donors.onrender.com/users/dashboard/${parseInt(authData.userId!) - 1}/`,
    );

    const response_Profile = await fetch(
      `https://life-donors.onrender.com/users/profile/${authData.userId}/`,
    );

    if (response_Dashboard.ok) {
      setIsRequestsLoading(false);
      const data: unknown = await response_Dashboard.json();
      console.log(data);
      const parsedData = ApiResponseSchema.parse(data);
      setUserRequests(parsedData.my_requests);
    } else {
      setIsRequestsLoading(false);
    }

    if (response_Profile.ok) {
      setIsProfileLoading(false);
      const data: unknown = await response_Profile.json();
      const validatedData = UserProfileSchemaArray.parse(data);
      setProfile(validatedData);
    } else {
      setIsProfileLoading(false);
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!requestDate) {
      return toast({
        variant: "destructive",
        title: "No date is selected",
        description: `Please select a date`,
      });
    }

    if (!authData) {
      toast({
        title: "User is not authenticated",
        description: `Please log in to do this operation`,
      });
      return router.push("/login");
    }

    const formValues = {
      user_id: parseInt(authData.userId!),
      blood_group: data.blood_group,
      blood_request_type: data.blood_request_type,
      district: data.district,
      date_of_donation: getCurrentDateFormatted(requestDate),
      gender: data.gender,
      details: data.details,
    };

    console.table(formValues);

    const res = await fetch(
      `https://life-donors.onrender.com/users/create/request/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      },
    );

    if (res.ok) {
      void getData();
      setOpen(false);
      toast({
        title: "Request is created",
        description: `Requested for a donor on ${getCurrentDateFormatted(requestDate)}`,
      });
    } else {
      void getData();
      setOpen(false);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: `Requested couldn't be created`,
      });
    }
  }

  useEffect(() => {
    if (!authData) {
      router.replace("/login");
    }
    void getData();
  }, [authData]);

  return (
    <main className="min-h-[85dvh] w-full">
      <h2 className="mx-auto max-w-7xl px-2 py-8 text-3xl font-bold xl:px-0">
        Dashboard
      </h2>
      <div className="mx-auto max-w-7xl px-2 pb-8 xl:px-0">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Make a request</Button>
          </DialogTrigger>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
              >
                <FormField
                  control={form.control}
                  name="blood_group"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormLabel>Group</FormLabel>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Blood Group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select</SelectLabel>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select</SelectLabel>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="blood_request_type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select</SelectLabel>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Running">Running</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <Popover>
                        <FormLabel>District</FormLabel>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value !== ""
                                ? districts.find(
                                    (district) =>
                                      district.value === field.value,
                                  )?.label
                                : "Select district"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search district..." />
                            <CommandList>
                              <CommandEmpty>No district found.</CommandEmpty>
                              <CommandGroup>
                                {districts.map((district) => (
                                  <CommandItem
                                    value={district.label}
                                    key={district.value}
                                    onSelect={() => {
                                      form.setValue("district", district.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        district.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {district.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input placeholder="Note" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <FormLabel>Select a date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex-1 justify-start text-left font-normal",
                          !requestDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {requestDate ? (
                          format(requestDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={requestDate}
                        onSelect={setRequestDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex items-end justify-end">
                  <Button variant={"destructive"} type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-2 pb-8 md:grid-cols-2 lg:grid-cols-3 xl:px-0">
        <Card className="max-w-lg p-4">
          <h2 className="py-2 text-lg font-semibold">My Requests</h2>
          {isRequestsLoading ? (
            <div className="flex w-full items-center justify-center py-8">
              <Loader2 className="animate-spin" size={20} />
            </div>
          ) : userRequests && userRequests?.length > 0 ? (
            <div className="divide space-y-3 divide-y divide-black/15">
              <div className="flex items-start justify-between py-2">
                <p className="font-medium">Date</p>
                <p className="font-medium">Group</p>
                <p className="font-medium">Status</p>
              </div>
              <div className="divide flex flex-col-reverse gap-2 divide-y divide-black/15">
                {userRequests?.map((item, index) => (
                  <div key={`${item.donor}-${index}`} className="py-2">
                    <div className="flex items-center justify-between">
                      <p>{item.date_of_donation}</p>
                      <p>{item.blood_group}</p>
                      <p>{item.blood_request_type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No requests are made yet.</p>
          )}
        </Card>
        <Card className="h-[19.2rem] max-w-lg p-4">
          <h2 className="py-2 text-lg font-semibold">My Details</h2>
          {isProfileLoading ? (
            <div className="flex w-full items-center justify-center py-8">
              <Loader2 className="animate-spin" size={20} />
            </div>
          ) : profile ? (
            profile?.map((item, index) => (
              <div key={index} className="divide divide-y divide-black/15">
                <div className="flex items-center justify-between py-3">
                  <p>username</p>
                  <p>{item.user}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>blood group</p>
                  <p>{item.blood_group}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>district</p>
                  <p>{item.district ? item.district : "N/A"}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p>available</p>
                  <p>{item.is_available ? "yes" : "no"}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Data not found.</p>
          )}
        </Card>
        <div className="w-full">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="flex items-center justify-center rounded-md border"
          />
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
