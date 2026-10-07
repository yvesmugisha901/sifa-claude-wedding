import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 16" className={`h-4 w-40 ${className}`} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 8h66M94 8h66" />
      <path d="M80 2c3 3 3 9 0 12-3-3-3-9 0-12Z" />
      <path d="M70 8c3-4 7-4 8 0M90 8c-3-4-7-4-8 0" />
    </svg>
  );
}
