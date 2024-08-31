import type { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import type { HTMLInputTypeAttribute } from "react";

type MyFormFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type: HTMLInputTypeAttribute;
  control: Control<T, unknown>;
  placeholder: string;
  inputClassName?: string;
  className?: string;
};

export function MyFormField<T extends FieldValues>(props: MyFormFieldProps<T>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              type={props.type}
              placeholder={props.placeholder}
              {...field}
              className={props.inputClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
