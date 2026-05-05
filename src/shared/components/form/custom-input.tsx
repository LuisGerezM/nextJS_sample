import { forwardRef, InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ hasError, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`input input-bordered w-full ${hasError ? "input-error" : ""} ${className}`}
        {...props}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";
