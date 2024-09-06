"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import { BloodRequestSchema } from "@/query/availableRequests";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/userData";

const FormSchema = z.object({
  district: z.string().min(1, { message: "Please select a district." }),
  group: z.string().min(1, { message: "Please select a blood group." }),
});

export type RequestType = z.infer<typeof BloodRequestSchema>;

type Props = {
  setterFn: ({ data }: { data: RequestType[] }) => void;
  setIsSearchLoading: Dispatch<SetStateAction<boolean>>;
  isSearchLoading: boolean;
};

export default function Search({
  setterFn,
  setIsSearchLoading,
  isSearchLoading,
}: Props) {
  const userData = useUserStore((state) => state.userData);
  const searchParams = useSearchParams();
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

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (!userData) return;
    setIsSearchLoading(true);

    const response: unknown = await fetch(
      `https://life-donors.onrender.com/users/request_search/?${createQueryString("blood_group", values.group)}&${createQueryString("district", values.district)}&${createQueryString("donor_id", userData.userId!)}`,
    )
      .then((res) => res.json())
      .finally(() => setIsSearchLoading(false));

    const validatedData = z.array(BloodRequestSchema).parse(response);
    setterFn({ data: validatedData });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 md:flex-row"
      >
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem className="w-full md:flex-1">
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
            <FormItem className="w-full md:flex-1">
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
                <PopoverContent className="w-full p-0">
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

        <Button
          type="submit"
          variant={"destructive"}
          className="flex w-full items-center justify-center gap-2 px-8 md:w-auto"
        >
          {isSearchLoading ? (
            <>
              <p>Searching</p>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            "Search Donor"
          )}
        </Button>
      </form>
    </Form>
  );
}
