import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";


//extended native HTML input attributes to create reusable form components compatible with standard input behavior and accessibility requirements.

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

//forwardRef: Some libraries need direct access to the real DOM input.
//EX: React Hook Form- focus management- accessibility tools

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition-all",
        "placeholder:text-gray-500",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";