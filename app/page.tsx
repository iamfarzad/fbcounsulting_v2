"use client"

import { useEffect, useState } from "react"
import { useAIInterface } from "@/components/ai-interface-provider"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import ContactSection from "@/components/contact-section"
import GetStartedSection from "@/components/get-started-section"
import Footer from "@/components/footer"

export default function Home() {
  const { isChatActive, isVoiceActive } = useAIInterface()
  const [isLoading, setIsLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Set hydrated state to true after initial render
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Loading state
  useEffect(() => {
    if (isHydrated) {
      // Simulate page loading
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [isHydrated])

  // Scroll event listener for parallax effects
  useEffect(() => {
    if (isHydrated) {
      const handleScroll = () => {
        const scrollY = window.scrollY

        document.querySelectorAll("[data-parallax]").forEach((element) => {
          const speed = Number.parseFloat(element.getAttribute("data-parallax") || "0.1")
          ;(element as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`
        })
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isHydrated])

  if (isLoading) {return (<div className="fixed inset-0 bg-white dark:bg-dark-900 flex items-center justify-center z-50"><div className="relative"><div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary rounded-full animate-spin"></div><div className="mt-4 text-primary font-medium">Loading...</div></div></div>)}

  if (!isHydrated) {
    // Render a placeholder or fallback content while waiting for hydration
    return null
  }

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <div
          className={`transition-opacity duration-500 ${isChatActive || isVoiceActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <ServicesSection />
          <TestimonialsSection />
          <GetStartedSection />
          <CTASection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  )
}

