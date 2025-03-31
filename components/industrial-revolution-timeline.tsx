"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const timelineData = [
  {
    era: "Industry 1.0",
    year: "1784",
    title: "Mechanization",
    description: "Steam engines and mechanical production equipment",
    features: ["Steam power", "Mechanization"],
    color: "from-amber-400 to-amber-500",
  },
  {
    era: "Industry 2.0",
    year: "1870",
    title: "Mass Production",
    description: "Assembly lines and mass production capabilities",
    features: ["Mass production", "Assembly lines", "Electrical energy"],
    color: "from-orange-400 to-orange-500",
  },
  {
    era: "Industry 3.0",
    year: "1969",
    title: "Automation",
    description: "Electronics, IT systems, and early automation",
    features: ["Automation", "PLS and DDC", "Computers"],
    color: "from-red-400 to-red-500",
  },
  {
    era: "Industry 4.0",
    year: "Today",
    title: "Connectivity & Intelligence",
    description: "Cyber-physical systems and smart factories",
    features: ["IoT", "Big data", "Artificial Intelligence", "Cloud services"],
    color: "from-purple-400 to-purple-500",
  },
  {
    era: "Industry 5.0",
    year: "Future",
    title: "Human-Centered",
    description: "Collaboration between humans and machines",
    features: ["AI leadership", "Self-optimization", "Self-management", "Human-centered approach"],
    color: "from-blue-400 to-blue-500",
  },
]

export default function IndustrialRevolutionTimeline() {
  const [activeEra, setActiveEra] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div className="space-y-12" ref={ref}>
      <motion.div
        className="flex justify-between items-center overflow-x-auto pb-4 md:pb-0 hide-scrollbar"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {timelineData.map((era, index) => (
          <div key={index} className="flex flex-col items-center min-w-[120px]">
            <Button
              variant="ghost"
              className={`rounded-full h-16 w-16 p-0 border-2 transition-all duration-300 ${
                activeEra === index
                  ? `bg-gradient-to-br ${era.color} text-white border-transparent shadow-md`
                  : "border-slate-200 hover:border-primary/50"
              }`}
              onClick={() => setActiveEra(index)}
            >
              {era.year}
            </Button>
            <div className="text-center mt-3 text-sm font-medium">{era.era}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="relative h-2 bg-slate-100 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className={`absolute h-full rounded-full bg-gradient-to-r ${timelineData[activeEra].color}`}
          initial={{ width: `${activeEra * 25}%` }}
          animate={{ width: `${(activeEra + 1) * 25}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <motion.div
        key={activeEra}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className={`h-2 w-full bg-gradient-to-r ${timelineData[activeEra].color}`} />
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-light mb-2">
                  <span className="font-semibold">{timelineData[activeEra].title}</span>
                </h3>
                <p className="text-slate-500 mb-4">{timelineData[activeEra].description}</p>

                <h4 className="font-medium mb-2 text-sm uppercase tracking-wider text-slate-400">Key Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timelineData[activeEra].features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${timelineData[activeEra].color}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeEra === 4 && (
                <div className="bg-slate-50 rounded-lg p-6 md:max-w-sm">
                  <h4 className="font-medium mb-3">Why Industry 5.0?</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Industry 5.0 benefits businesses, workers, and society by empowering teams with advanced skills,
                    increasing competitiveness, and attracting top talent while promoting sustainable practices and
                    resilient operations.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

