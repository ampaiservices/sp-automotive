import { ReactNode } from "react";

type Props = {
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-body text-sm uppercase tracking-[0.18em] transition-colors duration-200";
const styles = {
  primary: "border border-accent text-accent hover:bg-accent hover:text-bg",
  ghost: "text-accent hover:underline underline-offset-4",
};

export default function Button({ variant = "primary", href, onClick, className = "", children }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
