import type { ReactNode } from "react";

import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "plain";
  className?: string;
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" fill="none">
    <path
      d="M3 13L13 3M13 3H5.5M13 3v7.5"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: ButtonLinkProps) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      data-hover
      className={cx(solid ? styles.btn : styles.plain, className)}
    >
      <span>{children}</span>
      {solid && <Arrow />}
    </a>
  );
}
