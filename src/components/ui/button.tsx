import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Grenze } from "next/font/google";
import { MailOpenIcon } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  |"subSecondary"
  |"outline";

type ButtonSize =
  | "sm"
  | "md"
  | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean

}

const variantStyles = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",

  secondary:
    "bg-gray-200 hover:bg-gray-300 text-black",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  subSecondary:
    "bg-pink-600 hover:bg-pink-400 text-white hover:text-black",
  
  outline:
    "border border-pink-600 text-pink-600 bg-transparent hover:bg-pink-600 hover:text-white",
};

const sizeStyles = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors cursor-pointer duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}