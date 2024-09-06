"use client";

import { Card } from "@/components/ui/card";
import {
  useProfileDetailsQuery,
  useUpdateProfileMutation,
} from "@/query/profile";
import { useUserStore } from "@/store/userData";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
  User,
  UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { districts } from "@/assets/constants";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useDashboardQuery } from "@/query/dashboard";
import Ripple from "@/components/ui/ripple";

const formSchema = z.object({
  district: z.string().min(2, {
    message: "Please select a district",
  }),
  gender: z
    .string()
    .min(2, { message: "Please select 'Male' or 'Female' for gender." }),
});

function getCurrentDateFormatted(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const userData = useUserStore((state) => state.userData);
  const [open, setOpen] = useState(false);
  const [requestDate, setRequestDate] = useState<Date | undefined>(() => {
    const today = new Date();
    return isNaN(today.getTime()) ? undefined : today;
  });
  const { data, isLoading, isError, error } = useProfileDetailsQuery(
    userData ? parseInt(userData.userId!) : undefined,
  );
  const { data: dashboardData } = useDashboardQuery({
    authData: userData ? userData : undefined,
  });
  const {
    mutate: updateProfile,
    isPending,
    isSuccess,
  } = useUpdateProfileMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district: "",
      gender: "",
    },
  });

  useEffect(() => {
    setOpen(false);
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!requestDate) {
      return toast({
        variant: "destructive",
        title: "Date is not selected",
        description: "Please select date of your last donation first.",
      });
    }

    if (!userData) {
      return toast({
        variant: "destructive",
        title: "Auth data not found",
        description: "Please make sure you are authenticated",
      });
    }

    updateProfile({
      id: userData.userId!,
      district: values.district,
      gender: values.gender,
      lastDonation: getCurrentDateFormatted(requestDate),
    });

    setOpen(false);
  }

  useEffect(() => {
    if (!userData) {
      router.push("/login");
    }
  }, [userData]);

  useEffect(() => {
    if (!data) return;

    if (
      data.date_of_donation === null ||
      data.gender === "" ||
      data.district === ""
    ) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data]);

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-[85dvh] overflow-x-hidden bg-gray-100">
      <div className="mx-auto max-w-7xl px-2 xl:px-0">
        <h2 className="mx-auto max-w-7xl py-10 text-center text-4xl font-bold text-rose-500 lg:text-left">
          My Profile
        </h2>
        <div className="grid grid-cols-1 flex-col items-center justify-center gap-8 pb-8 md:grid-cols-2 md:pb-0">
          <Card className="flex h-full flex-col gap-4 p-4 shadow-md">
            <div className="flex items-center justify-between gap-4">
              <Card className="flex w-full flex-col items-center justify-center py-4 text-center">
                <p className="text-lg font-bold text-rose-800">
                  {isLoading
                    ? "00"
                    : dashboardData
                      ? dashboardData.my_donate.length
                      : "00"}
                </p>
                <p className="text-sm text-gray-900">Donations</p>
              </Card>
              <Card className="flex w-full flex-col items-center justify-center py-4 text-center">
                <p className="text-lg font-bold text-rose-800">
                  {isLoading
                    ? "00"
                    : dashboardData?.my_requests
                      ? dashboardData.my_requests.length
                      : "00"}
                </p>
                <p className="text-sm text-gray-900">Requests</p>
              </Card>
            </div>
            <Card className="relative flex min-h-[30dvh] flex-1 items-center justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-r from-red-300 to-rose-600 text-white shadow-md ring-1 ring-white">
                <User size={40} />
              </div>
              <Ripple />
            </Card>
          </Card>
          {data ? (
            <Card className="w-full rounded-lg bg-white p-6 shadow-md">
              <div className="flex w-full items-center justify-between pb-4">
                <h3 className="pb-4 text-xl font-bold text-rose-500">
                  Basic information
                </h3>
                <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2 rounded-lg px-4 py-2 transition"
                    >
                      {isPending ? (
                        <>
                          Updating
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Update
                          <UserCog className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95%] max-w-lg rounded-md p-6">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-rose-500">
                        Update your profile to make donations
                      </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="mt-1 w-full">
                                    <SelectValue placeholder="Select Gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Select</SelectLabel>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
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
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="mt-1 w-full justify-between"
                                    >
                                      {field.value
                                        ? districts.find(
                                            (d) => d.value === field.value,
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
                                      <CommandEmpty>
                                        No district found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {districts.map((district) => (
                                          <CommandItem
                                            key={district.value}
                                            value={district.label}
                                            onSelect={() =>
                                              form.setValue(
                                                "district",
                                                district.value,
                                              )
                                            }
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

                        <div>
                          <FormLabel>Last donation</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "mt-1 w-full justify-start text-left font-normal",
                                  !requestDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {requestDate
                                  ? format(requestDate, "PPP")
                                  : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={requestDate}
                                onSelect={(date) => {
                                  setRequestDate(date);
                                  console.log("Selected date:", date); // Debugging line
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <Button
                          type="submit"
                          variant={"destructive"}
                          className="w-full rounded-lg py-2 text-white transition duration-300"
                        >
                          Submit
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Username", value: data.user.username },
                  { label: "Blood Group", value: data.blood_group },
                  { label: "District", value: data.district ?? "N/A" },
                  {
                    label: "Last Donation",
                    value: data.date_of_donation ?? "N/A",
                  },
                  { label: "Gender", value: data.gender ?? "N/A" },
                  {
                    label: "Available",
                    value: data.is_available ? "Yes" : "No",
                  },
                  { label: "Email", value: data.email ?? "N/A" },
                  {
                    label: "Mobile",
                    value: data.mobile_number ?? "N/A",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b py-2 last:border-none"
                  >
                    <p className="font-medium text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="animate-spin" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
