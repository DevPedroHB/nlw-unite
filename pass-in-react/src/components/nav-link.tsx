import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface INavLink extends ComponentProps<"a"> {}

export function NavLink({ children, className, ...props }: INavLink) {
  return (
    <a
      className={twMerge("text-sm font-medium text-zinc-300", className)}
      {...props}
    >
      {children}
    </a>
  );
}
