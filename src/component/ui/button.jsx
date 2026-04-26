import * as React from "react"
export function Button({ className, variant = "default", size = "default", ...props }) {
  const Comp = "button"
  const variants = {
    default: "bg-white text-maroon hover:bg-white/90",
    outline: "border border-white/20 bg-transparent hover:bg-white/10 text-white",
    ghost: "hover:bg-white/10 text-white",
  }
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
