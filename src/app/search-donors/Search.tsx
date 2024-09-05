"use client";

import { Calendar } from "@/components/ui/calendar";
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
import { Button } from "@/components/ui/button";
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
import { type BloodDonor, BloodDonorArraySchema } from "@/query/searchDonor";

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

type Props = {
  updateSearchDonors: (donors: BloodDonor[]) => void;
};

export default function Search({ updateSearchDonors }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      district: "",
      group: "",
    },
  });

  async function getData(url: string) {
    const res = await fetch(url);

    if (res.ok) {
      const data: unknown = await res.json();
      const parsedData = BloodDonorArraySchema.parse(data);
      updateSearchDonors(parsedData);
    }
  }

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const url = `https://life-donors.onrender.com/users/donors/?${createQueryString("blood_group", values.group)}&${createQueryString("district", values.district)}`;
    void getData(url);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 px-2 py-8 sm:flex-row lg:px-4 xl:px-0"
      >
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem className="w-full sm:flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormItem className="w-full sm:flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value !== ""
                        ? districts.find(
                            (district) => district.value === field.value,
                          )?.label
                        : "Select district"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 sm:w-[200px]">
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal sm:flex-1",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 sm:w-auto">
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
          variant="destructive"
          className="w-full px-8 sm:w-auto"
        >
          Search Donor
        </Button>
      </form>
    </Form>
  );
}
