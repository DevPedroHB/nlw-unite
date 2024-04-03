import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const iconButton = tv({
  base: "rounded-md border border-white/10 p-1.5 disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-white/10",
      transparent: "bg-black/20",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface IIconButton
  extends ComponentProps<"button">,
    VariantProps<typeof iconButton> {}

export function IconButton({
  children,
  className,
  variant,
  ...props
}: IIconButton) {
  return (
    <button className={iconButton({ variant, className })} {...props}>
      {children}
    </button>
  );
}
