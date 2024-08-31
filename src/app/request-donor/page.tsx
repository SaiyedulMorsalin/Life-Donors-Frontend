"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { districts } from "@/assets/constants";
import { Card } from "@/components/ui/card";

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

export default function RequestDonor() {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <main className="min-h-[85dvh]">
      <div className="mx-auto max-w-7xl py-4">
        <h2 className="py-8 text-center text-3xl font-bold">
          Request for Donation
        </h2>
        <Card className="mx-auto max-w-md p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                  (district) => district.value === field.value,
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
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end justify-end">
                <Button variant={"destructive"} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}

// {
//     "blood_group": null,
//     "blood_request_type": null,
//     "district": "",
//     "date_of_donation": null,
//     "gender": null,
//     "details": "",
//     "cancel": false
// }
