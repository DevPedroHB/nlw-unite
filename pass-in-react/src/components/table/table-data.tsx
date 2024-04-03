import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ITableData extends ComponentProps<"td"> {}

export function TableData({ children, className, ...props }: ITableData) {
  return (
    <td
      className={twMerge("px-4 py-3 text-sm text-zinc-300", className)}
      {...props}
    >
      {children}
    </td>
  );
}
