import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function Sheet({ children, open, onOpenChange }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          {children}
        </>
      )}
    </AnimatePresence>
  )
}

export function SheetContent({ children, className }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`fixed right-0 top-0 h-full w-full sm:w-[400px] z-[101] shadow-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function SheetHeader({ children, className }) {
  return <div className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}>{children}</div>
}

export function SheetTitle({ children, className }) {
  return <h2 className={`text-lg font-semibold text-white ${className}`}>{children}</h2>
}

export function SheetDescription({ children, className }) {
  return <p className={`text-sm text-white/50 ${className}`}>{children}</p>
}
