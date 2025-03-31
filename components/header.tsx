"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Sun, Moon, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8 bg-black mr-2"></div>
          <span className="font-semibold text-lg">F.B Consulting</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="flex items-center text-text-primary hover:text-primary transition-colors">
              Services
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-2">
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  AI Consulting
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  Process Automation
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  Machine Learning
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center text-text-primary hover:text-primary transition-colors">
              About
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-2">
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  Our Team
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  Our Story
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center text-text-primary hover:text-primary transition-colors">
              Resources
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-2">
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  Blog
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  Case Studies
                </Link>
                <Link href="#" className="block px-4 py-2 text-sm text-text-primary hover:bg-gray-100">
                  Whitepapers
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:flex text-text-primary hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button
            className="hidden md:flex text-text-primary hover:text-primary transition-colors"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            href="#contact"
            className="hidden md:block bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 transition-colors"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-md">
          <div className="container py-4 space-y-4">
            <Link
              href="#services"
              className="block py-2 text-text-primary hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#about"
              className="block py-2 text-text-primary hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#resources"
              className="block py-2 text-text-primary hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="#contact"
              className="block py-2 text-text-primary hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex space-x-4 pt-2 border-t border-gray-100">
              <button className="text-text-primary hover:text-primary transition-colors">
                <Search size={20} />
              </button>
              <button className="text-text-primary hover:text-primary transition-colors" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

