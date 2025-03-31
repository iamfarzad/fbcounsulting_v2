"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSectionInsights() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white text-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:20px_20px] opacity-[0.03]" />

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

      <div className="container mx-auto px-4 text-center z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-block mb-6 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          Transforming Business Through Intelligence
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-light mb-6 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8 }}
        >
          Learning cannot be designed,
          <br />
          it can only be <span className="font-semibold">designed for</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-slate-500 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          (Wenger, 1998)
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-slate-600">
            Explore how industry evolution, emerging competencies, and artificial intelligence are reshaping the future
            of business and organizational leadership.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <a
          href="#industrial-revolution"
          className="flex flex-col items-center text-slate-400 hover:text-primary transition-colors"
        >
          <span className="mb-2 text-sm">Explore Insights</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </motion.div>
    </div>
  )
}

