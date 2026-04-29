import { MouseEvent, ReactNode } from "react";

type Props = {
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-body text-sm uppercase tracking-[0.18em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
const styles = {
  primary: "border border-accent text-accent hover:bg-accent hover:text-bg",
  ghost: "text-accent hover:underline underline-offset-4",
};

export default function Button({ variant = "primary", href, onClick, className = "", ariaLabel, children }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) return <a href={href} onClick={onClick} aria-label={ariaLabel} className={cls}>{children}</a>;
  return <button type="button" onClick={onClick} aria-label={ariaLabel} className={cls}>{children}</button>;
}
