import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ITableRow extends ComponentProps<"tr"> {}

export function TableRow({ children, className, ...props }: ITableRow) {
  return (
    <tr className={twMerge("border-b border-white/10", className)} {...props}>
      {children}
    </tr>
  );
}
