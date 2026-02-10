import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

type BaseButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonLinkProps = BaseButtonProps & {
  href: string;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-sky-600 text-white hover:bg-sky-700",
  secondary:
    "border border-slate-300 text-slate-900 hover:bg-slate-100 bg-white",
};

function getClasses(variant: ButtonVariant, className?: string) {
  return `${baseClasses} ${variantClasses[variant]} ${className ?? ""}`.trim();
}

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getClasses(variant, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  href,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={getClasses(variant, className)}>
      {children}
    </Link>
  );
}

