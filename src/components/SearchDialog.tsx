"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";
import { Search, UserRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useState } from "react";
import { districts } from "@/assets/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { Card } from "./ui/card";

const BloodDonorSchema = z.object({
  user: z.string(),
  blood_group: z.string(),
  district: z.string(),
  date_of_donation: z.string().nullable(),
  gender: z.string(),
  is_available: z.boolean(),
});

const BloodDonorArraySchema = z.array(BloodDonorSchema);

type BloodDonor = z.infer<typeof BloodDonorSchema>;

const FormSchema = z.object({
  district: z
    .string({
      required_error: "Please select a district.",
    })
    .min(1, { message: "Please select a district." }),
  group: z
    .string({
      required_error: "Please select a blood group.",
    })
    .min(1, { message: "Please select a blood group." }),
});

export default function SearchDialog() {
  const searchParams = useSearchParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isError, setIsError] = useState(false);
  const [searchData, setSearchData] = useState<BloodDonor[] | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      district: "",
      group: "",
    },
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  async function getData(url: string) {
    const res = await fetch(url);

    if (res.ok) {
      const data: unknown = await res.json();
      const parsedData = BloodDonorArraySchema.parse(data);
      setSearchData(parsedData);
    } else {
      setIsError(true);
    }
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsError(false);
    const url = `https://life-donors.onrender.com/users/donors/?${createQueryString("blood_group", values.group)}&${createQueryString("district", values.district)}`;
    void getData(url);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Search size={25} />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto w-[96%] max-w-lg rounded-md p-6">
        <DialogTitle>Search for donors</DialogTitle>
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto flex w-full flex-col items-start justify-center gap-4 py-4"
            >
              <div className="flex w-full items-start justify-between gap-4">
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                  name="district"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <Popover>
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
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button
                type="submit"
                variant={"destructive"}
                className="w-full px-8"
              >
                Search Donor
              </Button>
            </form>
          </Form>

          {searchData ? (
            <div className="grid grid-cols-1 py-4">
              {searchData.length > 0 ? (
                searchData.map((item, index) => (
                  <Card
                    key={index}
                    className="flex items-center justify-center p-4"
                  >
                    <UserRound size={50} className="w-[20%] text-destructive" />
                    <div className="w-full flex-1">
                      <div className="flex w-full items-start justify-start">
                        <p className="w-[25%]">Name</p>
                        <p className="flex-1 pl-2">{item.user}</p>
                      </div>
                      <div className="flex items-start justify-start">
                        <p className="w-[25%]">Group</p>
                        <p className="flex-1 pl-2">{item.blood_group}</p>
                      </div>
                      <div className="flex items-start justify-start">
                        <p className="w-[25%]">District</p>
                        <p className="flex-1 pl-2">
                          {item.district === "" ? "N/A" : item.district}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          ) : null}
          {isError ? (
            <p className="py-4 text-destructive">Something bad happened.</p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
