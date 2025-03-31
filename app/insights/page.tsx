"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section-insights"
import IndustrialRevolutionTimeline from "@/components/industrial-revolution-timeline"
import CompetenciesSection from "@/components/competencies-section"
import RolesSection from "@/components/roles-section"
import AISection from "@/components/ai-section"
import LocalLLMSection from "@/components/local-llm-section"
import SidebarResourcesNav from "@/components/sidebar-resources-nav"

export default function InsightsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-dark-900 flex items-center justify-center z-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary rounded-full animate-spin"></div>
          <div className="mt-4 text-primary font-medium">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SidebarResourcesNav />
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 bg-slate-50">
                    <h3 className="font-semibold text-slate-800">On This Page</h3>
                  </div>
                  <div className="p-2">
                    <a
                      href="#industrial-revolution"
                      className="flex items-center gap-2 p-3 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span>Industrial Evolution</span>
                    </a>
                    <a
                      href="#competencies"
                      className="flex items-center gap-2 p-3 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span>Future Competencies</span>
                    </a>
                    <a
                      href="#changing-roles"
                      className="flex items-center gap-2 p-3 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span>Evolving Roles</span>
                    </a>
                    <a
                      href="#ai-section"
                      className="flex items-center gap-2 p-3 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span>AI Integration</span>
                    </a>
                    <a
                      href="#local-llm"
                      className="flex items-center gap-2 p-3 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span>Local LLM Solutions</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <section id="industrial-revolution" className="py-12 bg-white rounded-lg shadow-md mb-8">
                <div className="px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                  >
                    <h2 className="text-3xl font-light mb-4">
                      Industrial <span className="font-semibold">Evolution</span>
                    </h2>
                    <p className="text-slate-600">
                      Explore the progression of industrial revolutions and how they've transformed business operations
                      and workforce requirements over time.
                    </p>
                  </motion.div>

                  <IndustrialRevolutionTimeline />
                </div>
              </section>

              <section id="competencies" className="py-12 bg-white rounded-lg shadow-md mb-8">
                <div className="px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                  >
                    <h2 className="text-3xl font-light mb-4">
                      Future <span className="font-semibold">Competencies</span>
                    </h2>
                    <p className="text-slate-600">
                      Discover the essential skills and competencies that will define successful businesses and
                      professionals in the coming decades.
                    </p>
                  </motion.div>

                  <CompetenciesSection />
                </div>
              </section>

              <section id="changing-roles" className="py-12 bg-white rounded-lg shadow-md mb-8">
                <div className="px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                  >
                    <h2 className="text-3xl font-light mb-4">
                      Evolving <span className="font-semibold">Roles</span>
                    </h2>
                    <p className="text-slate-600">
                      Understand how traditional roles are transforming in response to technological advancement and
                      changing business models.
                    </p>
                  </motion.div>

                  <RolesSection />
                </div>
              </section>

              <section id="ai-section" className="py-12 bg-white rounded-lg shadow-md mb-8">
                <div className="px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                  >
                    <h2 className="text-3xl font-light mb-4">
                      AI <span className="font-semibold">Integration</span>
                    </h2>
                    <p className="text-slate-600">
                      Explore how artificial intelligence is being integrated into various business functions and the
                      impact it's having on operations and strategy.
                    </p>
                  </motion.div>

                  <AISection />
                </div>
              </section>

              <section id="local-llm" className="py-12 bg-white rounded-lg shadow-md mb-8">
                <div className="px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                  >
                    <h2 className="text-3xl font-light mb-4">
                      Local <span className="font-semibold">LLM Solutions</span>
                    </h2>
                    <p className="text-slate-600">
                      Discover platforms for running language models locally with full control over data security and
                      performance.
                    </p>
                  </motion.div>

                  <LocalLLMSection />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

