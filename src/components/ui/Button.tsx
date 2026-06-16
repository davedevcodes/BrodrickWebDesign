"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost-light" | "primary-dark";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: "bg-white text-black hover:bg-text-secondary",
  secondary: "border border-border text-white hover:border-white",
  "ghost-light": "border border-black/15 text-black hover:border-black",
  "primary-dark": "bg-black text-white hover:bg-black/80",
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
    variantClasses[variant],
    className
  );

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {content}
    </button>
  );
}
