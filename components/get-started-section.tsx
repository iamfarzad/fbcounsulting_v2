"use client"

import { motion } from "framer-motion"
import { Lightbulb, ArrowRight } from "lucide-react"
import ResourcesNavigation from "./resources-navigation"
import { Button } from "@/components/ui/button"

export default function GetStartedSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl font-light mb-4">
            How to <span className="font-semibold">Get Started</span>
          </h2>
          <p className="text-slate-600">
            Begin your AI transformation journey with these resources and steps to implement effective automation
            solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Explore Resources</h3>
            <p className="text-slate-600 mb-4">
              Review our business insights and literature database to understand how AI is transforming industries.
            </p>
            <ResourcesNavigation />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Assess Your Needs</h3>
            <p className="text-slate-600 mb-4">
              Identify key areas in your business that could benefit from AI automation and process improvement.
            </p>
            <div className="bg-slate-50 p-4 rounded-md">
              <div className="flex items-start gap-3 mb-3">
                <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                <p className="text-sm">
                  Consider starting with processes that are repetitive, time-consuming, or prone to human error.
                </p>
              </div>
              <Button variant="outline" className="w-full justify-between">
                View Assessment Guide
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Schedule Consultation</h3>
            <p className="text-slate-600 mb-4">
              Connect with our experts to discuss your specific needs and develop a tailored implementation plan.
            </p>
            <Button className="w-full justify-between">
              Book a Free Consultation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

