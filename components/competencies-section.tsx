"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Brain,
  Briefcase,
  Globe,
  Lightbulb,
  MessageSquare,
  Puzzle,
  Scale,
  Sparkles,
  Workflow,
} from "lucide-react"

const centuryCompetencies = [
  {
    id: "academic",
    title: "Technical Competencies",
    description: "Core domain knowledge and digital literacy",
    icon: <BookOpen className="h-6 w-6" />,
    skills: [
      { name: "Domain Expertise", description: "Mastery of industry-specific knowledge" },
      { name: "Digital Fluency", description: "Advanced technology skills and adaptability" },
    ],
  },
  {
    id: "thinking",
    title: "Analytical Skills",
    description: "Critical analysis and problem-solving abilities",
    icon: <Brain className="h-6 w-6" />,
    skills: [
      { name: "Critical Thinking", description: "Analysis, evaluation, and problem-solving" },
      { name: "Strategic Foresight", description: "Anticipating market trends and opportunities" },
      { name: "Continuous Learning", description: "Self-directed professional development" },
    ],
  },
  {
    id: "creative",
    title: "Innovation Skills",
    description: "Creative thinking and implementation",
    icon: <Lightbulb className="h-6 w-6" />,
    skills: [
      { name: "Design Thinking", description: "Human-centered approach to innovation" },
      { name: "Entrepreneurial Mindset", description: "Identifying and capitalizing on opportunities" },
    ],
  },
  {
    id: "social",
    title: "Collaboration Skills",
    description: "Effective teamwork and communication",
    icon: <MessageSquare className="h-6 w-6" />,
    skills: [
      { name: "Cross-functional Collaboration", description: "Working effectively across departments" },
      { name: "Virtual Collaboration", description: "Remote and digital team coordination" },
      { name: "Stakeholder Management", description: "Building and maintaining key relationships" },
    ],
  },
  {
    id: "cultural",
    title: "Global Perspective",
    description: "Understanding diverse markets and cultures",
    icon: <Globe className="h-6 w-6" />,
    skills: [
      { name: "Cultural Intelligence", description: "Navigating diverse business environments" },
      { name: "Global Market Awareness", description: "Understanding international business dynamics" },
    ],
  },
  {
    id: "career",
    title: "Leadership Skills",
    description: "Guiding teams and driving change",
    icon: <Briefcase className="h-6 w-6" />,
    skills: [
      { name: "Change Management", description: "Leading organizations through transformation" },
      { name: "Adaptive Leadership", description: "Flexibility in approach and decision-making" },
    ],
  },
]

const employerSkills = [
  { name: "Analytical Thinking & Innovation", icon: <Puzzle /> },
  { name: "Active Learning & Learning Strategies", icon: <BookOpen /> },
  { name: "Complex Problem Solving", icon: <Workflow /> },
  { name: "Critical Thinking & Analysis", icon: <Brain /> },
  { name: "Creativity, Originality & Initiative", icon: <Lightbulb /> },
  { name: "Leadership & Social Influence", icon: <Scale /> },
  { name: "Technology Use & Monitoring", icon: <Sparkles /> },
  { name: "Resilience, Stress Tolerance & Flexibility", icon: <Workflow /> },
]

export default function CompetenciesSection() {
  const [selectedTab, setSelectedTab] = useState("century")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref}>
      <Tabs defaultValue="century" className="w-full" onValueChange={setSelectedTab}>
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <TabsList className="grid w-full max-w-md grid-cols-2 p-1 rounded-full bg-slate-100">
            <TabsTrigger value="century" className="rounded-full py-2">
              Business Competencies
            </TabsTrigger>
            <TabsTrigger value="employer" className="rounded-full py-2">
              Market Demand
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="century" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {centuryCompetencies.map((competency, index) => (
              <motion.div
                key={competency.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                  <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary group-hover:from-primary group-hover:to-primary/80 transition-colors duration-300" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2 bg-primary/10 text-primary">{competency.icon}</div>
                      <div>
                        <CardTitle>{competency.title}</CardTitle>
                        <CardDescription>{competency.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {competency.skills.map((skill, index) => (
                        <li key={index} className="flex flex-col">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-slate-500">{skill.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="employer" className="mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary/40 to-primary" />
              <CardHeader>
                <CardTitle className="text-2xl font-light">
                  Skills in <span className="font-semibold">Demand</span>
                </CardTitle>
                <CardDescription>
                  According to the World Economic Forum (2020), these are the most sought-after skills in the modern
                  workplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {employerSkills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all duration-300"
                    >
                      <div className="rounded-full p-2 bg-primary/10 text-primary">{skill.icon}</div>
                      <span className="text-sm">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

