"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Dynamic3DLogo from "./dynamic-3d-logo"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <div className="relative mr-3 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                <Dynamic3DLogo />
              </div>
              <span className="font-display font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
                F.B Consulting
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/#services"
                className="text-sm text-slate-600 hover:text-primary transition-colors relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/insights"
                className="text-sm text-slate-600 hover:text-primary transition-colors relative group"
              >
                Insights
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/literature"
                className="text-sm text-slate-600 hover:text-primary transition-colors relative group"
              >
                Literature
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-slate-600 hover:text-primary transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Button className="bg-primary hover:bg-primary-600 text-white rounded-full px-6">Get Started</Button>
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-4">
          <Button variant="ghost" size="icon" className="text-primary" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative mr-3">
              <Dynamic3DLogo />
            </div>
            <span className="font-display font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
              F.B Consulting
            </span>
          </Link>
        </div>

        <nav className="flex flex-col items-center justify-center space-y-8">
          <Link
            href="/#services"
            className="text-xl font-medium text-slate-800 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/insights"
            className="text-xl font-medium text-slate-800 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Insights
          </Link>
          <Link
            href="/literature"
            className="text-xl font-medium text-slate-800 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Literature
          </Link>
          <Link
            href="/#contact"
            className="text-xl font-medium text-slate-800 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Button
            className="mt-8 bg-primary hover:bg-primary-600 text-white rounded-full px-8 py-6"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </>
  )
}

