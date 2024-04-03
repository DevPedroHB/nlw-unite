import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ITableHeader extends ComponentProps<"th"> {}

export function TableHeader({ children, className, ...props }: ITableHeader) {
  return (
    <th
      className={twMerge(
        "px-4 py-3 text-left text-sm font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}
