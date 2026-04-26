import * as React from "react"

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-maroon text-white",
    outline: "border border-white/20 text-white/70",
    secondary: "bg-white/10 text-white",
  }
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
