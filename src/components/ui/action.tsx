import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

const base =
  "action-button group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]";

export function ActionButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} action-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ActionLink({
  children,
  variant = "primary",
  className = "",
  ...props
}: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} action-${variant} ${className}`} {...props}>
      {children}
    </a>
  );
}