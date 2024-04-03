import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ITableRoot extends ComponentProps<"table"> {}

export function TableRoot({ children, className, ...props }: ITableRoot) {
  return (
    <div className="rounded-lg border border-white/10">
      <table className={twMerge("w-full", className)} {...props}>
        {children}
      </table>
    </div>
  );
}
